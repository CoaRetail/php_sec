/** 相談種別。label は Airtable の単一選択の選択肢名と完全一致させること */
export const consultTypes = [
  { id: "security-compliance", hash: "#apply-security", label: "セキュリティ調査票・是正対応" },
  { id: "web-maintenance", hash: "#apply-web", label: "PHP・WordPress更新" },
  { id: "incident-response", hash: "#apply-incident", label: "サイト・システム障害" },
] as const;
