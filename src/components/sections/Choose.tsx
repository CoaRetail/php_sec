import Icon from "../Icon";
import { themes } from "@/data/content";

export default function Choose() {
  return (
    <section className="sec" id="choose">
      <p className="eyebrow rv">SELECT</p>
      <h2 className="h2 rv">いま、何にお困りですか？</h2>
      <p className="sub rv">取引先への対応、Webサイトの更新、突然のシステムトラブル。現在の状況に近いものをお選びください。</p>
      <div className="tree rv" aria-label="お悩みの分岐">
        <p className="tree__root">いま困っていること</p>
        <div className="tree__branches">
          {themes.map((t) => (
            <a key={t.id} className={`tree__b ${t.cls}`} href={`#${t.id}`}>
              <span className="ico"><Icon name={t.icon} /></span>
              <b>{t.indexLabel}</b>
            </a>
          ))}
        </div>
      </div>
      <div className="cards">
        {themes.map((t) => (
          <a key={t.id} className={`card ${t.cls} rv`} href={`#${t.id}`} data-event="problem_card_click" data-theme={t.id}>
            <span className="ico"><Icon name={t.icon} /></span>
            <h3 className="card__ttl">{t.card}</h3>
            <p className="card__q">{t.quote}</p>
            <ul className="card__tags">{t.tags.map((x) => <li key={x}>{x}</li>)}</ul>
            <span className="card__go">この課題の解決方法を見る →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
