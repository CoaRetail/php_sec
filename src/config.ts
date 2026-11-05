export const siteConfig = {
  name: "WEB/ITの駆け込み寺",
  service: "IT対応の外部緊急担当",
  title: "IT対応の外部緊急担当 | WEB/ITの駆け込み寺",
  description:
    "セキュリティ調査票への回答、PHP・WordPressの更新、サイト障害の切り分けまで。社内にいない担当者を、外から補います。",
  noindex: true, // テスト中は true。公開時に false
  gtmId: "", // 例: GTM-XXXXXXX。空なら出力しない
  form: {
    embedUrl: "https://airtable.com/embed/appROfZa17mQV0IIF/pagPA0V84VsfMBJQm/form", // Airtableフォームの埋め込みURL
    prefillField: "相談種別", // Airtable側の項目名(プリフィル用)
    height: 720, // iframeの高さ(px)。項目数に応じて調整
  },
  privacyUrl: "https://www.coaretail.com/lp_privacy", // プライバシーポリシーのURL
  copyrightHolder: "CoaRetail G.K.", // コピーライトの表記
  phone: "", // 電話CTAを出す場合に設定
};
