import HeroFigure from "../HeroFigure";

export default function Hero() {
  return (
    <section className="fv" id="fv">
      <p className="badge rv">今月の受付枠 残り10社</p>
      <h1 className="fv__h1 rv">仕事はある。<br />でも、<em>対応できる人がいない。</em></h1>
      <p className="fv__lead rv">顧客への約束を守れない。納期が迫っている。社内では解決できない。そんな状況を解消するための支援です。</p>
      <div className="fv__fig rv"><HeroFigure /></div>
      <div className="btns">
        <a className="btn btn--cta" href="#contact" data-cta="consult">現在の状況を無料で相談する</a>
        <p className="cta-note">ご相談内容を確認し、対応可能な範囲と次の進め方をご案内します。調査・修正作業は、内容確認後のお見積もりとなります。</p>
        <a className="link" href="#proof">任せられる理由を見る</a>
      </div>
    </section>
  );
}
