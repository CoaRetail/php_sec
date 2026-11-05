"use client";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config";

/** #apply-xxx のハッシュ → Airtable側の選択肢名。完全一致が必要 */
const LABELS: Record<string, string> = {
  "#apply-security": "セキュリティ調査票・是正対応",
  "#apply-web": "PHP・WordPress更新",
  "#apply-incident": "サイト・システム障害",
};

export default function ContactForm() {
  const [type, setType] = useState("");
  useEffect(() => {
    const sync = () => setType(LABELS[location.hash] ?? "");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const { embedUrl, prefillField, height } = siteConfig.form;
  const src = type ? `${embedUrl}?prefill_${encodeURIComponent(prefillField)}=${encodeURIComponent(type)}` : embedUrl;
  return (
    <iframe className="airtable-embed" src={src} title="お問い合わせフォーム" loading="lazy" width="100%" height={height} />
  );
}
