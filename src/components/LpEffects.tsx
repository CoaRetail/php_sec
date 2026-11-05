"use client";
import { useEffect } from "react";

declare global {
  interface Window { dataLayer?: unknown[]; consultType?: () => string }
}

const MAP: Record<string, string> = {
  "#apply-security": "security-compliance",
  "#apply-web": "web-maintenance",
  "#apply-incident": "incident-response",
};

/** 計測: dataLayer(GTM等)がある場合だけ送る。無ければ何もしない。 */
const push = (event: string, theme?: string | null) => {
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event, theme: theme ?? "" });
};

/** reveal / 固定CTA / 計測 / 相談種別。マークアップは変更しない。 */
export default function LpEffects() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const qa = <T extends Element>(s: string) => Array.from(document.querySelectorAll<T>(s));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rv = qa(".rv");
    if (reduce) rv.forEach((e) => e.classList.add("in"));
    else {
      const ro = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
      }), { threshold: 0.12 });
      rv.forEach((e) => ro.observe(e));
      cleanups.push(() => ro.disconnect());
    }

    const stick = document.getElementById("stick");
    const fv = document.getElementById("fv");
    const ct = document.getElementById("contact");
    if (stick && fv && ct) {
      const st = { fv: true, ct: false };
      const upd = () => stick.classList.toggle("show", !st.fv && !st.ct);
      const a = new IntersectionObserver((e) => { st.fv = e[0].isIntersecting; upd(); });
      const b = new IntersectionObserver((e) => { st.ct = e[0].isIntersecting; upd(); });
      a.observe(fv); b.observe(ct);
      cleanups.push(() => { a.disconnect(); b.disconnect(); });
    }

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-event],[data-cta]");
      if (el) push(el.dataset.event || "cta_click", el.dataset.theme || el.dataset.cta);
    };
    document.addEventListener("click", onClick);
    cleanups.push(() => document.removeEventListener("click", onClick));

    const seen = new Set<string>();
    const vo = new IntersectionObserver((es) => es.forEach((e) => {
      const t = (e.target as HTMLElement).dataset.themeSection;
      if (e.isIntersecting && t && !seen.has(t)) { seen.add(t); push("problem_section_view", t); }
    }), { threshold: 0.4 });
    qa("[data-theme-section]").forEach((s) => vo.observe(s));
    cleanups.push(() => vo.disconnect());

    window.consultType = () => MAP[location.hash] || "";
    const sync = () => {
      const t = window.consultType?.() ?? "";
      qa<HTMLElement>(".chip").forEach((c) => c.classList.toggle("is-on", !!t && MAP[c.getAttribute("href") ?? ""] === t));
    };
    window.addEventListener("hashchange", sync);
    sync();
    cleanups.push(() => window.removeEventListener("hashchange", sync));

    return () => cleanups.forEach((f) => f());
  }, []);
  return null;
}
