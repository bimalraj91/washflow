import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#080A0A" }}>
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path d="M16 2.5 6.2 15.4a11 11 0 0 0-1.7 5.9C4.5 27 9.6 30 16 30s11.5-3 11.5-8.7c0-2.1-.6-4.1-1.7-5.9L16 2.5Z" fill="none" stroke="#F5F6F1" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="m9.5 18.5 3 6 3.5-6.5 3.5 6.5 3-6" fill="none" stroke="#C7FF45" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
