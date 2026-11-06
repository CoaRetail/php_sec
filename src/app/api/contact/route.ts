import { NextResponse } from "next/server";
import { consultTypes } from "@/data/consult";

export const runtime = "nodejs";

/** Airtable「問い合わせ」テーブルの項目名(完全一致) */
const FIELD = {
  type: "相談種別",
  company: "企業名",
  name: "担当者名",
  url: "URL",
  email: "連絡先メールアドレス",
  message: "困りごとの詳細",
  status: "ステータス",
} as const;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>(); // 簡易レート制限(サーバーレスでは目安)

function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > MAX_HITS;
}

const clean = (v: unknown) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim() : "";

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

const trunc = (s: string, n: number) => (s.length > n ? `${s.slice(0, n)}…` : s);

/** Incoming Webhook。失敗しても問い合わせ自体は成功扱い */
async function notifySlack(row: {
  type: string;
  company: string;
  name: string;
  url: string;
  email: string;
  message: string;
}) {
  const hook = process.env.SLACK_WEBHOOK_URL?.trim();
  if (!hook) return;
  if (!hook.startsWith("https://hooks.slack.com/")) {
    console.error("[contact] SLACK_WEBHOOK_URL は https://hooks.slack.com/ で始まる必要があります");
    return;
  }
  const lines = [
    "*新しい問い合わせ* — WEB/ITの駆け込み寺",
    `*相談種別:* ${trunc(row.type, 80)}`,
    `*企業名:* ${trunc(row.company, 100)}`,
    `*担当者名:* ${trunc(row.name, 100)}`,
    `*メール:* ${trunc(row.email, 254)}`,
    row.url ? `*URL:* ${trunc(row.url, 300)}` : null,
    `*困りごと:*\n${trunc(row.message, 1500)}`,
  ].filter(Boolean);
  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: lines.join("\n") }),
    cache: "no-store",
  }).catch(() => null);
  if (!res || !res.ok) {
    console.error("[contact] Slack webhook error", res?.status ?? "network");
  }
}

export async function POST(req: Request) {
  // 同一オリジンからのみ受け付ける
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return fail("不正なリクエストです。", 403);
    } catch {
      return fail("不正なリクエストです。", 403);
    }
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return fail("短時間に送信が続いています。しばらくしてからお試しください。", 429);

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail("入力内容を読み取れませんでした。", 400);
  }

  // ハニーポット: 入力があれば成功を装って破棄する
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const type = clean(body.type);
  const company = clean(body.company);
  const name = clean(body.name);
  const url = clean(body.url);
  const email = clean(body.email);
  const message = clean(body.message);

  if (!consultTypes.some((c) => c.label === type)) return fail("相談種別を選択してください。", 400);
  if (!company || company.length > 100) return fail("企業名を100文字以内で入力してください。", 400);
  if (!name || name.length > 100) return fail("担当者名を100文字以内で入力してください。", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return fail("メールアドレスの形式をご確認ください。", 400);
  if (!message || message.length > 3000) return fail("困りごとの詳細を3000文字以内で入力してください。", 400);
  if (body.consent !== true) return fail("プライバシーポリシーへの同意が必要です。", 400);
  if (url) {
    try {
      const u = new URL(url);
      if ((u.protocol !== "http:" && u.protocol !== "https:") || url.length > 500) throw new Error();
    } catch {
      return fail("URLの形式をご確認ください(https:// から入力)。", 400);
    }
  }

  // Cloudflare Turnstile(任意)
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const ok = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: clean(body.turnstile), remoteip: ip }),
    })
      .then((r) => r.json() as Promise<{ success?: boolean }>)
      .then((j) => j.success === true)
      .catch(() => false);
    if (!ok) return fail("確認に失敗しました。ページを再読み込みして、もう一度お試しください。", 400);
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME || "問い合わせ";
  if (!token || !baseId) {
    console.error("[contact] AIRTABLE_TOKEN / AIRTABLE_BASE_ID が未設定です");
    return fail("現在フォームをご利用いただけません。しばらくしてからお試しください。", 500);
  }

  const fields: Record<string, string> = {
    [FIELD.type]: type,
    [FIELD.company]: company,
    [FIELD.name]: name,
    [FIELD.email]: email,
    [FIELD.message]: message,
  };
  if (url) fields[FIELD.url] = url;
  if (process.env.AIRTABLE_STATUS_NEW) fields[FIELD.status] = process.env.AIRTABLE_STATUS_NEW;

  const api = process.env.AIRTABLE_API_ORIGIN || "https://api.airtable.com";
  const res = await fetch(`${api}/v0/${baseId}/${encodeURIComponent(table)}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields }] }),
    cache: "no-store",
  }).catch(() => null);

  if (!res || !res.ok) {
    console.error("[contact] Airtable error", res?.status ?? "network", res ? await res.text().catch(() => "") : "");
    return fail("送信に失敗しました。時間をおいて、もう一度お試しください。", 502);
  }

  await notifySlack({ type, company, name, url, email, message });
  return NextResponse.json({ ok: true });
}
