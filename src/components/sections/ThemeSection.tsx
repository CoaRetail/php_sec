import Icon from "../Icon";
import Pipe from "../Pipe";
import { infos } from "@/data/content";
import type { Theme } from "@/data/types";

const FLOW_LABELS = ["問題", "対応", "成果"];

export default function ThemeSection({ t, alt }: { t: Theme; alt?: boolean }) {
  const inf = infos[t.id];
  return (
    <section className={`sec dtl ${t.cls}${alt ? " sec--alt" : ""}`} id={t.id} data-theme-section={t.id}>
      <p className="dtl__lab rv"><span className="ico"><Icon name={t.icon} /></span>{t.label}</p>
      <h2 className="h2 rv">{t.h2}</h2>
      <p className="sub rv">{t.intro}</p>
      <ol className="flow3 rv">
        {t.flow.map((f, j) => (
          <li className="flow3__i" key={j}><small>{FLOW_LABELS[j]}</small>{f}</li>
        ))}
      </ol>
      {inf && (
        <div className="infog rv">
          <h3 className="infog__ttl">{inf.title}</h3>
          <Pipe nodes={inf.nodes} loop={inf.loop} />
          {inf.legend && (
            <ul className="legend">
              <li><i className="dot dot--ok" />対応済み</li>
              <li><i className="dot dot--ng" />未対応</li>
              <li><i className="dot dot--wr" />要改善</li>
            </ul>
          )}
        </div>
      )}
      <h3 className="h3 rv">提供する支援</h3>
      <ol className="steps">
        {t.steps.map((s, j) => (
          <li className="step rv" key={s}><span className="step__no">{j + 1}</span><span>{s}</span></li>
        ))}
      </ol>
      <div className="panels">
        <div className="panel panel--out rv"><h3 className="h3">期待できる成果</h3><ul>{t.outcomes.map((x) => <li key={x}>{x}</li>)}</ul></div>
        <div className="panel rv"><h3 className="h3">対応範囲・注意事項</h3><ul className="dim">{t.notes.map((x) => <li key={x}>{x}</li>)}</ul></div>
      </div>
      <a className="btn btn--cta" href={`#${t.applyId}`} data-event="problem_cta_click" data-theme={t.id}>{t.cta}</a>
    </section>
  );
}
