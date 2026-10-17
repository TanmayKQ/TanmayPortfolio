import { ImageResponse } from "next/og";
import { PROJECTS } from "@/data/projects";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#08090d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          border: "8px solid #1e2230",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "8px",
                background: "#0f1118",
                border: "2px solid #6366f1",
                color: "#818cf8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              TK
            </div>
            <div style={{ display: "flex", color: "#94a3b8", fontSize: "20px", fontFamily: "monospace" }}>
              {`// ARCHITECTURAL CASE STUDY · ${project.shortTitle.toUpperCase()}`}
            </div>
          </div>

          <div
            style={{
              borderRadius: "999px",
              padding: "8px 20px",
              border: "1px solid #6366f1",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#a5b4fc",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Tanmay Kotak
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: "1040px",
            }}
          >
            {project.title}
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#94a3b8",
              maxWidth: "1000px",
              lineHeight: 1.45,
            }}
          >
            {project.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1e2230",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {project.stack.slice(0, 5).map((tech) => (
              <div
                key={tech}
                style={{
                  background: "#141724",
                  border: "1px solid #282f44",
                  borderRadius: "6px",
                  padding: "6px 14px",
                  color: "#cbd5e1",
                  fontSize: "16px",
                  fontFamily: "monospace",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div style={{ color: "#64748b", fontSize: "18px", fontFamily: "monospace" }}>
            tanmay-devprofile.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
