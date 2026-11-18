import { ImageResponse } from "next/og";

export const alt = "WashFlow — car wash management software. Run your car wash, not your chaos.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(70% 60% at 80% 90%, rgba(199,255,69,0.22), #080A0A 70%)",
          color: "#F5F6F1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 32 32">
            <path d="M16 2.5 6.2 15.4a11 11 0 0 0-1.7 5.9C4.5 27 9.6 30 16 30s11.5-3 11.5-8.7c0-2.1-.6-4.1-1.7-5.9L16 2.5Z" fill="none" stroke="#F5F6F1" strokeWidth="1.8" />
            <path d="m9.5 18.5 3 6 3.5-6.5 3.5 6.5 3-6" fill="none" stroke="#C7FF45" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>WASHFLOW</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 0.92, letterSpacing: -4 }}>
          <span>RUN YOUR CAR WASH.</span>
          <span style={{ display: "flex" }}>
            NOT YOUR&nbsp;<span style={{ color: "#C7FF45" }}>CHAOS.</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#A1AAA4" }}>
          <span>Washes · Billing · Customers · Staff · Expenses · Reports</span>
          <span style={{ color: "#C7FF45" }}>Car wash management software</span>
        </div>
      </div>
    ),
    size,
  );
}
