import { scopes } from "@/data/content";

export default function Scope() {
  return (
    <section className="sec sec--alt" id="scope">
      <p className="eyebrow rv">SOLUTION</p>
      <h2 className="h2 rv">解決できる範囲を、先にはっきりさせる</h2>
      <p className="sub rv">できること、専門的な対応が必要なこと、個別に確認することを分けて伝えます。</p>
      <figure className="infog infog--venn rv">
        <svg className="venn" viewBox="0 0 320 300" role="img" aria-label="対応範囲の図: 内側が自社対応、中間が外部パートナー、外側が個別に確認する領域">
          <circle cx="160" cy="150" r="140" fill="none" stroke="#8A93A6" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="160" cy="150" r="100" fill="rgba(242,181,68,.2)" stroke="#F2B544" strokeWidth="2" />
          <circle cx="160" cy="150" r="58" fill="rgba(6,199,85,.18)" stroke="#06C755" strokeWidth="2" />
          <text x="160" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5F6778">対応できない領域</text>
          <text x="160" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#8A5A00">専門的な対応が必要</text>
          <text x="160" y="146" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1A2233">自社で対応</text>
          <text x="160" y="166" textAnchor="middle" fontSize="11" fill="#3F495C">診断・更新・障害調査</text>
        </svg>
      </figure>
      <div className="grid">
        {scopes.map((s) => (
          <div className={`box scope ${s.cls} rv`} key={s.label}>
            <small>{s.label}</small>
            <h3 className="box__ttl">{s.title}</h3>
            <ul>{s.items.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
