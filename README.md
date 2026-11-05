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

## 未実装
- 問い合わせフォーム: Airtableのフォームをiframeで埋め込み済み(`src/config.ts` の `form`)。相談種別をプリフィルするには、Airtable側に単一選択の項目「相談種別」(選択肢名は `ContactForm.tsx` の `LABELS` と完全一致)を作る
- 計測: `NEXT_PUBLIC_GTM_ID` 設定時のみ GTM 読込 + dataLayer 送信。GTM→GA4 のタグ設定手順は Vault `70_outputs/php_sec_GTM_GA4_setup.md`
- 公開前に `src/config.ts` の `noindex` を false に
