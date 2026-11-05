import { indexItems, themes } from "@/data/content";
import { Footer, Header, SideLeft, StickyCta, Tags } from "@/components/Shell";
import Hero from "@/components/sections/Hero";
import Choose from "@/components/sections/Choose";
import ThemeSection from "@/components/sections/ThemeSection";
import Pain from "@/components/sections/Pain";
import Risk from "@/components/sections/Risk";
import Scope from "@/components/sections/Scope";
import Proof from "@/components/sections/Proof";
import Contact from "@/components/sections/Contact";
import IndexNav from "@/components/IndexNav";
import LpEffects from "@/components/LpEffects";

export default function Page() {
  return (
    <>
      <div className="shell">
        <SideLeft />
        <main className="lp" id="top">
          <Header />
          <Tags />
          <Hero />
          <Choose />
          {themes.map((t, i) => (
            <ThemeSection key={t.id} t={t} alt={i % 2 === 1} />
          ))}
          <Pain />
          <Risk />
          <Scope />
          <Proof />
          <Contact />
          <Footer />
        </main>
        <IndexNav items={indexItems} />
      </div>
      <StickyCta />
      <LpEffects />
    </>
  );
}
