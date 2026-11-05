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
| 社名・サービス名・title・noindex・GTM ID・電話 | `src/config.ts` |
| 文言(3テーマ、PAIN、リスク、範囲、PROOF、図の中身) | `src/data/content.ts` |
| 各セクションのマークアップ | `src/components/sections/*.tsx` |
| 見た目(色・幅は先頭の変数) | `src/app/globals.css` |
| スクロール表示・固定CTA・計測・相談種別 | `src/components/LpEffects.tsx` |
| 右パネルの目次 | `src/data/content.ts` の `indexItems` + `IndexNav.tsx` |

## 未実装
- 問い合わせフォーム: Airtableのフォームをiframeで埋め込み済み(`src/config.ts` の `form`)。相談種別をプリフィルするには、Airtable側に単一選択の項目「相談種別」(選択肢名は `ContactForm.tsx` の `LABELS` と完全一致)を作る
- 計測: `gtmId` を設定した場合のみ dataLayer に送信 (problem_card_click / problem_section_view / problem_cta_click)
- 公開前に `src/config.ts` の `noindex` を false に
