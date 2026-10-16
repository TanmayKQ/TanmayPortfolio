import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Experience />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
