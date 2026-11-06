/** Vercel では NEXT_PUBLIC_GTM_ID で上書き可。未設定時は DEFAULT_GTM_ID */
const DEFAULT_GTM_ID = "GTM-T3QS2259";
const gtmId =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_GTM_ID?.trim()) || DEFAULT_GTM_ID;

export const siteConfig = {
  name: "WEB/ITの駆け込み寺",
  service: "IT対応の外部緊急担当",
  title: "IT対応の外部緊急担当 | WEB/ITの駆け込み寺",
  description:
    "セキュリティ調査票への回答、PHP・WordPressの更新、サイト障害の切り分けまで。社内にいない担当者を、外から補います。",
  noindex: true, // テスト中は true。公開時に false
  gtmId,
  /** GTM コンテナ内の Google タグ（GA4 設定）で使用。LP には gtag 直埋めしない */
  ga4MeasurementId: "G-BS30YQY1N7",
  privacyUrl: "https://www.coaretail.com/lp_privacy", // プライバシーポリシーのURL
  copyrightHolder: "CoaRetail G.K.", // コピーライトの表記
  copyrightUrl: "https://www.coaretail.com",
  phone: "", // 電話CTAを出す場合に設定
};
