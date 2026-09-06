import { ImageResponse } from "next/og";

export const alt =
  "Uttam Kumbhakar. Rust backend developer. Async systems, local AI, and developer tools.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0b0b0c",
          color: "#f4f4f5",
          padding: "0 100px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            borderLeft: "1px solid #27272a",
            borderRight: "1px solid #27272a",
            padding: "65px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 72,
            }}
          >
            <span style={{ fontSize: 38, color: "#e5a17a", fontWeight: 700 }}>
              UK
            </span>
            <span style={{ fontSize: 19, color: "#a1a1aa" }}>
              blocksdev.pro
            </span>
          </div>
          <div
            style={{
              color: "#e5a17a",
              fontSize: 20,
              letterSpacing: 3,
              marginBottom: 16,
            }}
          >
            RUST BACKEND DEVELOPER
          </div>
          <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: -3 }}>
            Uttam Kumbhakar
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 26,
              lineHeight: 1.5,
              color: "#a1a1aa",
              maxWidth: 730,
            }}
          >
            Async backend systems, local AI applications, and developer tools.
          </div>
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #27272a",
              marginTop: 60,
              paddingTop: 22,
              fontSize: 18,
              color: "#a1a1aa",
            }}
          >
            Jharkhand, India
          </div>
        </div>
      </div>
    ),
    size,
  );
}
