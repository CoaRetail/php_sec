import { siteConfig } from "@/config";
import { tickerTags } from "@/data/content";

export function SideLeft() {
  return (
    <aside className="side side--l" aria-label={siteConfig.name}>
      <p className="side__logo">{siteConfig.name}</p>
      <p className="side__tag">{siteConfig.service}</p>
      <p className="side__catch">仕事はある。<br />でも、<b>対応できる人がいない。</b></p>
      <div className="btns">
        <a className="btn btn--cta" href="#contact" data-cta="consult">無料で相談・チェックを申し込む</a>
        {siteConfig.phone && <a className="btn btn--tel" href={`tel:${siteConfig.phone}`}>電話で相談する</a>}
      </div>
    </aside>
  );
}

export function Header() {
  return (
    <header className="hd">
      <div className="hd__bar">
        <span className="logo">{siteConfig.name}<small>{siteConfig.service}</small></span>
        <a className="hd__cta" href="#contact" data-cta="consult">無料で相談</a>
      </div>
    </header>
  );
}

export function Tags() {
  const list = [...tickerTags, ...tickerTags];
  return (
    <div className="tags" aria-hidden="true">
      <div className="tags__track">{list.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  );
}

export function StickyCta() {
  return (
    <div className="stick" id="stick">
      <a className="btn btn--cta" href="#contact" data-cta="consult">無料で相談・チェックを申し込む</a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <span className="logo">{siteConfig.name}</span>
      <small>&copy; {siteConfig.name}</small>
    </footer>
  );
}
