import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { siteConfig } from "@/config";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  robots: siteConfig.noindex ? { index: false, follow: false } : undefined,
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

const GTM_SNIPPET = (id: string) =>
  `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { gtmId } = siteConfig;

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {gtmId ? (
          <script dangerouslySetInnerHTML={{ __html: "window.dataLayer=window.dataLayer||[];" }} />
        ) : null}
        {gtmId ? <Script id="gtm" strategy="beforeInteractive">{GTM_SNIPPET(gtmId)}</Script> : null}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" />
      </head>
      <body>
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        {children}
      </body>
    </html>
  );
}
