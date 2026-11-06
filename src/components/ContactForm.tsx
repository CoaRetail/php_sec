"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Script from "next/script";
import { siteConfig } from "@/config";
import { consultTypes } from "@/data/consult";

type Status = "idle" | "sending" | "done" | "error";

const push = (event: string, theme?: string) => {
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, theme: theme ?? "" });
};

export default function ContactForm() {
  const [type, setType] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const started = useRef(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // ページ上のボタン(#apply-xxx)から来たら、相談種別を自動で選ぶ
  useEffect(() => {
    const sync = () => {
      const t = consultTypes.find((c) => c.hash === location.hash);
      if (t) setType(t.label);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
    push("contact_form_start", consultTypes.find((c) => c.label === type)?.id);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          company: fd.get("company"),
          name: fd.get("name"),
          url: fd.get("url"),
          email: fd.get("email"),
          message: fd.get("message"),
          consent: fd.get("consent") === "on",
          website: fd.get("website"), // ハニーポット
          turnstile: fd.get("cf-turnstile-response"),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "送信に失敗しました。時間をおいて、もう一度お試しください。");
        setStatus("error");
        return;
      }
      push("contact_form_submit_success", consultTypes.find((c) => c.label === type)?.id);
      setStatus("done");
    } catch {
      setError("通信に失敗しました。時間をおいて、もう一度お試しください。");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="cform cform--done" role="status">
        <p className="cform__thanks">お問い合わせありがとうございます。</p>
        <p>担当者から、ご入力のメールアドレスへ改めてご連絡します。</p>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={onSubmit} onFocus={onStart} aria-busy={status === "sending"}>
      <h3 className="cform__ttl">現在の状況を無料で相談する</h3>

      <div className="cform__row">
        <label htmlFor="cf-type">相談種別 <b className="req">必須</b></label>
        <select id="cf-type" name="type" required value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">選択してください</option>
          {consultTypes.map((c) => <option key={c.id} value={c.label}>{c.label}</option>)}
        </select>
      </div>
      <div className="cform__row">
        <label htmlFor="cf-company">企業名 <b className="req">必須</b></label>
        <input id="cf-company" name="company" type="text" required maxLength={100} autoComplete="organization" placeholder="例）株式会社〇〇" />
      </div>
      <div className="cform__row">
        <label htmlFor="cf-name">担当者名 <b className="req">必須</b></label>
        <input id="cf-name" name="name" type="text" required maxLength={100} autoComplete="name" placeholder="例）山田 太郎" />
      </div>
      <div className="cform__row">
        <label htmlFor="cf-url">URL <span className="opt">任意</span></label>
        <input id="cf-url" name="url" type="url" maxLength={500} autoComplete="url" inputMode="url" placeholder="例）https://example.com" />
      </div>
      <div className="cform__row">
        <label htmlFor="cf-email">連絡先メールアドレス <b className="req">必須</b></label>
        <input id="cf-email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="例）info@example.com" />
      </div>
      <div className="cform__row">
        <label htmlFor="cf-message">困りごとの詳細 <b className="req">必須</b></label>
        <textarea id="cf-message" name="message" required rows={5} maxLength={3000} placeholder="例）取引先からセキュリティ調査票が届いたが、回答の方法が分からない" />
      </div>

      {/* ハニーポット: 人間には見えない。入力があれば送信を破棄する */}
      <div className="cform__hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {siteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
          <div className="cf-turnstile" data-sitekey={siteKey} />
        </>
      )}

      <label className="cform__consent">
        <input type="checkbox" name="consent" required />
        <span><a href={siteConfig.privacyUrl} target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>に基づく個人情報の取り扱いに同意します</span>
      </label>

      {status === "error" && <p className="cform__err" role="alert">{error}</p>}
      <button className="btn btn--cta cform__submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
    </form>
  );
}
