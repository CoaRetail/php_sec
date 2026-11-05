import Icon from "../Icon";
import Pipe from "../Pipe";
import { pains } from "@/data/content";

export default function Pain() {
  return (
    <section className="sec sec--alt" id="pain">
      <p className="eyebrow eyebrow--alert rv">PAIN</p>
      <h2 className="h2 rv">いま、何が事業を止めているのか</h2>
      <p className="sub rv">人員、対応スピード、システム、外注先。どこかが欠けただけで、仕事は止まります。</p>
      <div className="infog rv">
        <h3 className="infog__ttl">仕事が止まるしくみ</h3>
        <Pipe nodes={[
          { label: "仕事の依頼が入る" },
          { label: "どれか1つが欠ける", chips: ["人員", "対応スピード", "システム", "!外注先"] },
          { label: "約束の期日に届かない", sub: "事業が止まる" },
        ]} />
      </div>
      <div className="grid">
        {pains.map((p) => (
          <div className="box rv" key={p.title}>
            <span className="ico ico--alert"><Icon name={p.icon} /></span>
            <h3 className="box__ttl">{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
