import { Button } from "@/components/ui/Button/Button";

export default function NotFound() {
  return (
    <section className="container" style={{ minHeight: "80vh", display: "grid", alignContent: "center", gap: "1.5rem", paddingTop: "var(--nav-h)" }}>
      <p style={{ fontFamily: "var(--font-mono)", color: "var(--volt)", letterSpacing: ".14em" }}>404 · OFF THE MAP</p>
      <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", textTransform: "uppercase", letterSpacing: "-.035em" }}>This bay is empty.</h1>
      <div>
        <Button href="/" arrow>
          Back to WashFlow
        </Button>
      </div>
    </section>
  );
}
