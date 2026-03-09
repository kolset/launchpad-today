import { ImageResponse } from "next/og";
import { MOCK_PRODUCTS, PAST_WINNERS } from "@/lib/mock-data";

export const runtime = "edge";
export const alt = "Launchpad.today — AI-Ranked Startup Launches";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ALL_PRODUCTS = [...MOCK_PRODUCTS, ...PAST_WINNERS];

function getScoreColor(score: number): string {
  if (score >= 90) return "#39FF14";
  if (score >= 80) return "#00F0FF";
  return "#FFE600";
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "EXCEPTIONAL";
  if (score >= 80) return "STRONG";
  if (score >= 70) return "PROMISING";
  return "EARLY STAGE";
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0A0A0F",
            color: "#fff",
            fontFamily: "monospace",
            fontSize: 48,
          }}
        >
          Product Not Found
        </div>
      ),
      { ...size }
    );
  }

  const scoreColor = getScoreColor(product.aiScore);
  const scoreLabel = getScoreLabel(product.aiScore);

  const breakdownItems = [
    { label: "Innovation", value: product.aiBreakdown.innovation },
    { label: "Execution", value: product.aiBreakdown.execution },
    { label: "Potential", value: product.aiBreakdown.potential },
    { label: "Timing", value: product.aiBreakdown.timing },
  ];

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

        {/* Ambient glow - top left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(176,38,255,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Ambient glow - bottom right */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -80,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${scoreColor}15 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            padding: "48px 56px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left column - Product info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
              paddingRight: 48,
            }}
          >
            {/* Top: Branding */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    color: "#FF2D78",
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontFamily: "monospace",
                  }}
                >
                  LAUNCHPAD.TODAY
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                AI-Ranked Startup Launches
              </div>
            </div>

            {/* Middle: Product name + tagline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: -20,
              }}
            >
              {/* Category tag */}
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "#00F0FF",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    border: "1px solid rgba(0,240,255,0.25)",
                    borderRadius: 3,
                    background: "rgba(0,240,255,0.08)",
                    fontFamily: "monospace",
                  }}
                >
                  {product.category}
                </div>
              </div>

              {/* Emoji + Name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div style={{ fontSize: 48 }}>{product.logoEmoji}</div>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.1,
                    fontFamily: "monospace",
                  }}
                >
                  {product.name}
                </div>
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontSize: 22,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.4,
                  fontFamily: "monospace",
                  maxWidth: 520,
                }}
              >
                {product.tagline}
              </div>
            </div>

            {/* Bottom: Breakdown scores */}
            <div
              style={{
                display: "flex",
                gap: 24,
              }}
            >
              {breakdownItems.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      fontFamily: "monospace",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 700,
                      color: getScoreColor(item.value),
                      fontFamily: "monospace",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Score display */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 320,
              position: "relative",
            }}
          >
            {/* Score circle */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 260,
                height: 260,
                borderRadius: "50%",
                border: `3px solid ${scoreColor}`,
                background: `radial-gradient(circle, ${scoreColor}12 0%, transparent 70%)`,
                boxShadow: `0 0 40px ${scoreColor}30, 0 0 80px ${scoreColor}15, inset 0 0 40px ${scoreColor}08`,
                position: "relative",
              }}
            >
              {/* Outer ring glow */}
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  left: -8,
                  right: -8,
                  bottom: -8,
                  borderRadius: "50%",
                  border: `1px solid ${scoreColor}40`,
                  display: "flex",
                }}
              />

              {/* Score label */}
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                  marginBottom: 4,
                }}
              >
                AI SCORE
              </div>

              {/* Score number */}
              <div
                style={{
                  fontSize: 96,
                  fontWeight: 700,
                  color: scoreColor,
                  lineHeight: 1,
                  fontFamily: "monospace",
                }}
              >
                {product.aiScore}
              </div>

              {/* Score verdict */}
              <div
                style={{
                  fontSize: 13,
                  color: scoreColor,
                  letterSpacing: "2px",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  marginTop: 8,
                  opacity: 0.8,
                }}
              >
                {scoreLabel}
              </div>
            </div>

            {/* Winner badge */}
            {product.isWinner && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 24,
                  padding: "6px 16px",
                  borderRadius: 4,
                  background: "rgba(255,45,120,0.15)",
                  border: "1px solid rgba(255,45,120,0.4)",
                }}
              >
                <div style={{ fontSize: 16 }}>🏆</div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#FF2D78",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontFamily: "monospace",
                  }}
                >
                  {product.isWinner === "day"
                    ? "Product of the Day"
                    : product.isWinner === "week"
                      ? "Product of the Week"
                      : "Product of the Month"}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
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
