import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const runtime = "nodejs";
export const alt = "Tanmay Kotak - Backend & Applied AI Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          border: "8px solid #1b2030",
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
                border: "2px solid #00f0ff",
                color: "#00f0ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              TK
            </div>
            <div style={{ color: "#94a3b8", fontSize: "20px", fontFamily: "monospace" }}>
              // TANMAY KOTAK &middot; PUNE, IN
            </div>
          </div>

          <div
            style={{
              borderRadius: "999px",
              padding: "8px 20px",
              border: "1px solid #10b981",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#10b981",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Open to internships & full-time roles &middot; June 2027
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: "1000px",
            }}
          >
            I build backends that hold up, and AI systems that do real work.
          </div>

          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              maxWidth: "960px",
              lineHeight: 1.4,
            }}
          >
            Fourth-year Computer Engineering student building production APIs, SAP-integrated enterprise systems, RAG pipelines, and agentic AI tooling.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1b2030",
            paddingTop: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#00f0ff", fontSize: "36px", fontWeight: "bold", fontFamily: "monospace" }}>
                130+
              </span>
              <span style={{ color: "#64748b", fontSize: "16px", textTransform: "uppercase" }}>
                REST APIs Shipped
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#00f0ff", fontSize: "36px", fontWeight: "bold", fontFamily: "monospace" }}>
                9
              </span>
              <span style={{ color: "#64748b", fontSize: "16px", textTransform: "uppercase" }}>
                SAP Integration Pipelines
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#00f0ff", fontSize: "36px", fontWeight: "bold", fontFamily: "monospace" }}>
                100/98/100/100
              </span>
              <span style={{ color: "#64748b", fontSize: "16px", textTransform: "uppercase" }}>
                Client Lighthouse
              </span>
            </div>
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
