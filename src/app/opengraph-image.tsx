import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Launchpad.today — AI-Ranked Startup Launches";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0A0A0F",
          fontFamily: "monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(0,240,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient glow - top left (pink) */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,45,120,0.2) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Ambient glow - bottom right (cyan) */}
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Ambient glow - center (purple) */}
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 200,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(176,38,255,0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "48px 56px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Branding */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: 48 }}>🚀</div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: "#FF2D78",
                letterSpacing: "4px",
                textTransform: "uppercase",
                fontFamily: "monospace",
                lineHeight: 1,
              }}
            >
              LAUNCHPAD.TODAY
            </div>
          </div>

          {/* Divider line */}
          <div
            style={{
              width: 120,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(0,240,255,0.6), transparent)",
              marginBottom: 32,
              display: "flex",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: "#00F0FF",
              letterSpacing: "6px",
              textTransform: "uppercase",
              fontFamily: "monospace",
              fontWeight: 700,
              marginBottom: 40,
            }}
          >
            AI-Ranked Startup Launches
          </div>

          {/* Date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 28px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "2px",
                fontFamily: "monospace",
              }}
            >
              {today}
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.35)",
              fontFamily: "monospace",
              marginTop: 40,
              letterSpacing: "1px",
            }}
          >
            Discover the best new products, ranked by AI
          </div>
        </div>

        {/* Bottom rainbow bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              "linear-gradient(90deg, #FF2D78, #B026FF, #00F0FF, #39FF14, #FFE600, #FF2D78)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
