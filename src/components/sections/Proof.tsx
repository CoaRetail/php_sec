import Icon from "../Icon";
import { proofs } from "@/data/content";

export default function Proof() {
  return (
    <section className="sec sec--light" id="proof">
      <p className="eyebrow eyebrow--dark rv">PROOF</p>
      <h2 className="h2 rv">なぜ任せられるのか</h2>
      <p className="sub rv">手順、検証、成果物、条件。判断に必要な材料を全部出します。</p>
      <figure className="infog rv">
        <h3 className="infog__ttl">報告書のイメージ</h3>
        <div className="doc">
          <p className="doc__hd">診断報告書 <small>※イメージ</small></p>
          <p className="doc__row"><b className="lv lv--h">高</b><span>優先して対応する項目</span><em>まず対応</em></p>
          <p className="doc__row"><b className="lv lv--m">中</b><span>計画的に対応する項目</span><em>次に対応</em></p>
          <p className="doc__row"><b className="lv lv--l">低</b><span>状況を見ながら確認する項目</span><em>経過観察</em></p>
        </div>
      </figure>
      <div className="grid">
        {proofs.map((p, k) => (
          <div className="box rv" key={p.title}>
            <span className="ico ico--dark"><Icon name={p.icon} /></span>
            <small>PROOF {k + 1}</small>
            <h3 className="box__ttl">{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
