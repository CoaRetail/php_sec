export default function HeroFigure() {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="攻撃を受けやすい4つの入口を示す図: メール、Webサイト、社内ネットワーク、クラウド" className="hero-svg">
<circle cx="200" cy="200" r="190" fill="none" stroke="#DDD8CD" strokeWidth="1.5"/>
<circle cx="200" cy="200" r="140" fill="none" stroke="#DDD8CD" strokeWidth="1.5"/>
<circle cx="200" cy="200" r="90" fill="none" stroke="#CFC9BB" strokeWidth="1.5"/>
<path d="M200 150 L238 164 V204 C238 228 221 244 200 252 C179 244 162 228 162 204 V164 Z" fill="#FFFFFF" stroke="#1A2233" strokeWidth="2.5"/>
<path d="M184 202 L196 214 L218 188" fill="none" style={{ stroke: "var(--cta)" }} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
<line x1="200" y1="110" x2="200" y2="45" style={{ stroke: "var(--alert)" }} strokeWidth="2" strokeDasharray="4 5"/>
<line x1="290" y1="200" x2="350" y2="200" style={{ stroke: "var(--alert)" }} strokeWidth="2" strokeDasharray="4 5"/>
<line x1="200" y1="290" x2="200" y2="355" style={{ stroke: "var(--alert)" }} strokeWidth="2" strokeDasharray="4 5"/>
<line x1="110" y1="200" x2="50" y2="200" style={{ stroke: "var(--alert)" }} strokeWidth="2" strokeDasharray="4 5"/>
<circle cx="200" cy="40" r="9" style={{ fill: "var(--alert)" }}/><circle cx="355" cy="200" r="9" style={{ fill: "var(--alert)" }}/><circle cx="200" cy="360" r="9" style={{ fill: "var(--alert)" }}/><circle cx="45" cy="200" r="9" style={{ fill: "var(--alert)" }}/>
<text x="200" y="22" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1A2233">メール</text>
<text x="372" y="226" textAnchor="end" fontSize="15" fontWeight="700" fill="#1A2233">Webサイト</text>
<text x="200" y="392" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1A2233">クラウド</text>
<text x="28" y="226" textAnchor="start" fontSize="15" fontWeight="700" fill="#1A2233">社内NW</text>
</svg>
  );
}
