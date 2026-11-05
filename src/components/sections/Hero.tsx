import HeroFigure from "../HeroFigure";

export default function Hero() {
  return (
    <section className="fv" id="fv">
      <p className="badge rv">今月の受付枠 残り10社</p>
      <h1 className="fv__h1 rv">仕事はある。<br />でも、<em>対応できる人がいない。</em></h1>
      <p className="fv__lead rv">顧客への約束を守れない。納期が迫っている。社内では解決できない。そんな状況を解消するための支援です。</p>
      <div className="fv__fig rv"><HeroFigure /></div>
      <div className="btns">
        <a className="btn btn--cta" href="#contact" data-cta="consult">無料で相談・チェックを申し込む</a>
        <a className="link" href="#proof">任せられる理由を見る</a>
      </div>
    </section>
  );
}
