import ContactForm from "../ContactForm";
import Pipe from "../Pipe";

export default function Contact() {
  return (
    <section className="sec close" id="contact">
      <span id="apply-security" /><span id="apply-web" /><span id="apply-incident" />
      <p className="badge rv">今月の受付枠 残り10社</p>
      <h2 className="h2 rv">止まる前に、<br />まず何が詰まっているか教えてください。</h2>
      <p className="sub rv">ご相談内容を確認し、対応可能な範囲と次の進め方をご案内します。調査・修正作業は、内容確認後のお見積もりとなります。</p>
      <div className="infog infog--c">
        <h3 className="infog__ttl">ご相談から作業開始まで</h3>
        <Pipe nodes={[
          { label: "相談する", sub: "フォームに状況を入力" },
          { label: "内容を確認する", sub: "作業内容と対応時期は事前にご案内します" },
          { label: "対応範囲と進め方を案内", sub: "調査・修正は、お見積もりの後に開始" },
        ]} />
      </div>
      <div className="close__form" id="formSection">
        <ContactForm />
      </div>
    </section>
  );
}
