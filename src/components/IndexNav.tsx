"use client";
import { useEffect, useState } from "react";

export default function IndexNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);
  return (
    <nav className="side side--r" aria-label="ページ内目次">
      <span className="index__ttl">INDEX</span>
      <ol className="index">
        {items.map((i) => (
          <li key={i.id}><a href={`#${i.id}`} className={active === i.id ? "on" : undefined}>{i.label}</a></li>
        ))}
      </ol>
    </nav>
  );
}
