import { Helmet } from "react-helmet-async";
import { NavBar } from "./components/NavBar.jsx";
import { Hero } from "./components/Hero.jsx";
import { About } from "./components/About.jsx";
import { Skills } from "./components/Skills.jsx";
import { Projects } from "./components/Projects.jsx";
import { ResumeSection } from "./components/ResumeSection.jsx";
import { Contact } from "./components/Contact.jsx";
import { Footer } from "./components/Footer.jsx";

const SITE_META = {
  title: "Tanmay Kotak | Full-Stack Developer",
  description:
    "I build clean, scalable, and efficient digital products — from full-stack applications to AI-powered tools.",
  favicon: "/assets/favicon.png",
  metaImage: "/assets/og-image.png",
  email: "tanmaykotak22@gmail.com",
  github: "https://github.com/TanmayKQ",
  linkedin: "https://linkedin.com/in/tanmay-kotak-b3840b282",
  location: "Pune, Maharashtra, India"
};

const AUTHOR = "Tanmay Kotak";

export default function App() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR,
    url: window.location.origin,
    email: SITE_META.email,
    sameAs: [SITE_META.github, SITE_META.linkedin],
    description: SITE_META.description,
    jobTitle: SITE_META.title
  };

  return (
    <div className="page-shell">
      <Helmet>
        <title>{SITE_META.title}</title>
        <meta name="description" content={SITE_META.description} />
        <link rel="icon" href={SITE_META.favicon} />
        <meta property="og:title" content={SITE_META.title} />
        <meta property="og:description" content={SITE_META.description} />
        <meta property="og:image" content={SITE_META.metaImage} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

