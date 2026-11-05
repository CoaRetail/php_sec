import type { CSSProperties } from "react";
import { risks, stairs } from "@/data/content";

export default function Risk() {
  return (
    <section className="sec" id="risk">
      <p className="eyebrow eyebrow--alert rv">CONSEQUENCE</p>
      <h2 className="h2 rv">その問題を放置すると、何が起こるのか</h2>
      <p className="sub rv">遅れるほど、後ろのリスクが重くなります。</p>
      <div className="infog rv">
        <h3 className="infog__ttl">遅れるほど、影響は重くなる</h3>
        <ol className="stairs">
          {stairs.map((s) => (
            <li key={s.label} className={s.cls} style={{ "--h": `${s.h}%` } as CSSProperties}><span>{s.label}</span></li>
          ))}
        </ol>
      </div>
      <div className="grid">
        {risks.map((r, k) => (
          <div className="box rv" key={r.title}>
            <small>RISK {k + 1}</small>
            <h3 className="box__ttl">{r.title}</h3>
            <div className="bar"><i className={r.cls} style={{ width: `${r.pct}%` }} /></div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
