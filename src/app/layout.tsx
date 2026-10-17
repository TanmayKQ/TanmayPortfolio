import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/Shell";
import { VERIFIED_LINKS } from "@/data/projects";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#090a0f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(VERIFIED_LINKS.portfolio),
  title: {
    default: "Tanmay Kotak | Backend Engineer & Applied AI Systems",
    template: "%s | Tanmay Kotak",
  },
  description:
    "Tanmay Kotak is a backend and applied-AI engineer in Pune building production APIs, SAP-integrated systems, RAG pipelines, and agentic AI tools.",
  keywords: [
    "Tanmay Kotak",
    "Backend Engineer",
    "Applied AI Engineer",
    "RAG",
    "pgvector",
    "LangGraph",
    "FastAPI",
    "Node.js",
    "SAP S/4HANA",
    "Pune",
  ],
  authors: [{ name: "Tanmay Kotak", url: VERIFIED_LINKS.portfolio }],
  creator: "Tanmay Kotak",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: VERIFIED_LINKS.portfolio,
    title: "Tanmay Kotak | Backend Engineer & Applied AI Systems",
    description:
      "Tanmay Kotak is a backend and applied-AI engineer in Pune building production APIs, SAP-integrated systems, RAG pipelines, and agentic AI tools.",
    siteName: "Tanmay Kotak Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Kotak | Backend Engineer & Applied AI Systems",
    description:
      "Tanmay Kotak is a backend and applied-AI engineer in Pune building production APIs, SAP-integrated systems, RAG pipelines, and agentic AI tools.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/favicon.png",
    apple: "/assets/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tanmay Kotak",
    jobTitle: "Backend & Applied AI Engineer",
    url: VERIFIED_LINKS.portfolio,
    email: `mailto:${VERIFIED_LINKS.email}`,
    sameAs: [VERIFIED_LINKS.github, VERIFIED_LINKS.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "D.Y. Patil College of Engineering, Akurdi, Pune",
    },
    knowsAbout: [
      "Backend Architecture",
      "REST APIs",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "pgvector",
      "RAG Pipelines",
      "LangGraph",
      "SAP S/4HANA Integration",
      "State Machines",
    ],
  };

  const themeInitScript = `
    try {
      var saved = localStorage.getItem('tk_theme');
      if (saved === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    } catch(e) {}
  `;

  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} font-sans bg-base-dark text-zinc-100 min-h-screen bg-grid-pattern antialiased selection:bg-accent/25 selection:text-white transition-colors duration-150`}
      >
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
