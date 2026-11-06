# セキュリティLP (Next.js)

Next.js 14 (App Router) + TypeScript。依存は next / react のみ。

## 起動
```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```
Vercelにはそのままデプロイ可能 (Framework: Next.js)。

## 編集する場所
| 変えたいもの | ファイル |
|---|---|
| 社名・サービス名・title・noindex・電話 | `src/config.ts` |
| GTM / GA4 ID | 既定 `GTM-T3QS2259` + GTM 内 `G-BS30YQY1N7`（`src/config.ts` / `.env.example`） |
| 文言(3テーマ、PAIN、リスク、範囲、PROOF、図の中身) | `src/data/content.ts` |
| 各セクションのマークアップ | `src/components/sections/*.tsx` |
| 見た目(色・幅は先頭の変数) | `src/app/globals.css` |
| スクロール表示・固定CTA・計測・相談種別 | `src/components/LpEffects.tsx` |
| 右パネルの目次 | `src/data/content.ts` の `indexItems` + `IndexNav.tsx` |
| 相談種別ラベル | `src/data/consult.ts` |
| 問い合わせ送信 API | `src/app/api/contact/route.ts` |
| Airtable / Slack / Turnstile の鍵 | `.env` または Vercel（`.env.example` 参照。トークン・Webhook はリポジトリに置かない） |

## 未実装
- 問い合わせフォーム: 自前フォーム(`ContactForm.tsx`) → `src/app/api/contact/route.ts` → Airtable。成功後に `SLACK_WEBHOOK_URL` があれば Slack へ通知（失敗しても問い合わせは成功扱い）。`.env.example` の `AIRTABLE_*` / `SLACK_WEBHOOK_URL` を Vercel / `.env` に設定する。トークンはサーバー側のみ。Airtable側の項目名・選択肢名は `route.ts` の `FIELD` と `src/data/consult.ts` に完全一致させる
- 計測: `NEXT_PUBLIC_GTM_ID` 設定時のみ GTM 読込 + dataLayer 送信。GTM→GA4 のタグ設定手順は Vault `70_outputs/php_sec_GTM_GA4_setup.md`
- 公開前に `src/config.ts` の `noindex` を false に
