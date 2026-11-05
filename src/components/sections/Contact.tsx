import ContactForm from "../ContactForm";
import Pipe from "../Pipe";

export default function Contact() {
  return (
    <section className="sec close" id="contact">
      <span id="apply-security" /><span id="apply-web" /><span id="apply-incident" />
      <p className="badge rv">今月の受付枠 残り10社</p>
      <h2 className="h2 rv">止まる前に、<br />まず何が詰まっているか教えてください。</h2>
      <p className="sub rv">申込は約 [X] 分。無料で、営業電話は [条件] 以外ありません。</p>
      <div className="infog infog--c">
        <h3 className="infog__ttl">申込から報告まで</h3>
        <Pipe nodes={[
          { label: "申し込む", sub: "所要 [X] 分" },
          { label: "診断する", sub: "最短 [X] 営業日" },
          { label: "優先順位つきで報告", sub: "何から直すかが1枚で分かる" },
        ]} />
      </div>
      <p className="dim">相談種別</p>
      <div className="chips">
        <a className="chip chip-security" href="#apply-security">セキュリティ調査票・是正対応</a>
        <a className="chip chip-web" href="#apply-web">PHP・WordPress更新</a>
        <a className="chip chip-incident" href="#apply-incident">サイト・システム障害</a>
      </div>
      <div className="close__form" id="formSection">
        <ContactForm />
      </div>
    </section>
  );
}
