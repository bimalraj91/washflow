import { useId } from "react";

/**
 * Studio render of a performance crossover in profile, lit by a lime rim
 * light with water beading on the paint. Pure SVG: crisp at any size, ~4 KB,
 * no licensing. Swap for photography via next/image if the brand shoots one.
 */
export function CarRender({ className, title = "Black performance SUV in a dark wash studio, lit by a lime rim light" }: { className?: string; title?: string }) {
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;

  const body =
    "M60 252C54 226 62 206 86 197L192 179C252 169 320 160 372 150C422 110 472 82 542 76L690 76C762 78 822 105 872 150C906 158 936 170 946 190C953 210 951 236 941 256L842 262A72 72 0 0 0 698 262L302 262A72 72 0 0 0 158 262Z";
  const glass = "M398 150C442 112 482 93 546 89L680 89C740 91 790 113 828 148Z";

  const wheel = (cx: number) => (
    <g>
      <circle cx={cx} cy={262} r={63} fill="#040505" />
      <circle cx={cx} cy={262} r={63} fill="none" stroke="#1d2321" strokeWidth={2} />
      <circle cx={cx} cy={262} r={45} fill={`url(#${id("rim")})`} />
      {[0, 72, 144, 216, 288].map((a) => (
        <path
          key={a}
          d={`M${cx} ${262 - 8}L${cx - 6} ${262 - 41}L${cx + 6} ${262 - 41}Z`}
          fill="#2b3330"
          transform={`rotate(${a} ${cx} 262)`}
        />
      ))}
      <circle cx={cx} cy={262} r={45} fill="none" stroke="rgba(199,255,69,.35)" strokeWidth={1} />
      <circle cx={cx} cy={262} r={9} fill="#0c0f0e" stroke="#3a4440" />
      {/* brake caliper */}
      <path d={`M${cx + 20} ${262 - 30}a36 36 0 0 1 14 22`} stroke="var(--volt)" strokeWidth={6} strokeLinecap="round" fill="none" />
    </g>
  );

  const drops = [
    [430, 168, 2.2], [470, 176, 1.4], [512, 163, 1.8], [560, 172, 1.2], [604, 166, 2.4], [650, 174, 1.5],
    [700, 167, 1.9], [748, 175, 1.3], [790, 168, 2], [300, 186, 1.6], [262, 192, 1.2], [350, 200, 1.4],
    [240, 214, 1.1], [520, 214, 1.6], [610, 222, 1.2], [690, 210, 1.5], [860, 196, 1.3], [880, 214, 1.7],
    [180, 205, 1.3], [400, 226, 1.1], [760, 228, 1.2], [560, 236, 1.4],
  ] as const;

  const car = (
    <>
      <path d={body} fill={`url(#${id("paint")})`} />
      <path d={body} fill={`url(#${id("sheen")})`} />
      <g clipPath={`url(#${id("bodyclip")})`}>
        {/* overhead softbox streaking across the roof and shoulder */}
        <path d="M330 150C420 100 500 80 700 80L840 84C760 96 520 112 330 150Z" fill="#fff" opacity=".16" />
        <path d="M70 200C300 178 640 168 940 178L940 186C640 180 300 190 70 212Z" fill="#fff" opacity=".1" />
        {/* soft occlusion along the sill grounds the body */}
        <rect x="40" y="226" width="920" height="40" fill={`url(#${id("sill")})`} />
        {/* long vertical strip-light reflection on the doors */}
        <path d="M520 150L560 150L532 262L496 262Z" fill="#fff" opacity=".045" />
      </g>
      <path d={body} fill="none" stroke={`url(#${id("rimlight")})`} strokeWidth={1.6} />
      <path d={glass} fill={`url(#${id("glass")})`} stroke="rgba(255,255,255,.14)" />
      <path d="M430 140C470 114 506 100 556 97L592 97L552 140Z" fill="#fff" opacity=".07" />
      <path d="M612 89L606 148" stroke="#080a0a" strokeWidth={6} />
      {/* shoulder crease catching the light */}
      <path d="M96 206C300 186 600 176 934 183" stroke={`url(#${id("crease")})`} strokeWidth={1.5} fill="none" />
      <path d="M318 236L684 236" stroke="rgba(255,255,255,.06)" strokeWidth={1} />
      {/* door cut lines + handle */}
      <path d="M470 152L462 252M612 150L616 252" stroke="rgba(0,0,0,.55)" strokeWidth={1.2} />
      <rect x={545} y={192} width={34} height={4} rx={2} fill="rgba(255,255,255,.18)" />
      {/* lights */}
      <ellipse cx="96" cy="206" rx="46" ry="16" fill={`url(#${id("lamp")})`} />
      <path d="M78 207L152 196" stroke="var(--volt)" strokeWidth={3.5} strokeLinecap="round" />
      <ellipse cx="930" cy="188" rx="30" ry="12" fill="#ff5a4a" opacity=".16" />
      <path d="M902 179L944 194" stroke="#ff5a4a" strokeWidth={3} strokeLinecap="round" />
      {drops.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="rgba(255,255,255,.06)" />
          <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.35} fill="rgba(255,255,255,.55)" />
        </g>
      ))}
      {wheel(230)}
      {wheel(770)}
    </>
  );

  return (
    <svg className={className} viewBox="0 0 1000 420" role="img" aria-label={title} preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={id("paint")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#46514c" />
          <stop offset=".3" stopColor="#222927" />
          <stop offset=".62" stopColor="#0f1312" />
          <stop offset="1" stopColor="#050606" />
        </linearGradient>
        <linearGradient id={id("sheen")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".38" stopColor="#fff" stopOpacity=".07" />
          <stop offset=".46" stopColor="#fff" stopOpacity="0" />
          <stop offset=".7" stopColor="#c7ff45" stopOpacity=".05" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("rimlight")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c7ff45" stopOpacity=".9" />
          <stop offset=".35" stopColor="#c7ff45" stopOpacity=".25" />
          <stop offset=".7" stopColor="#fff" stopOpacity=".05" />
          <stop offset="1" stopColor="#fff" stopOpacity=".3" />
        </linearGradient>
        <linearGradient id={id("crease")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c7ff45" stopOpacity=".8" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".25" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d2523" />
          <stop offset=".5" stopColor="#060808" />
          <stop offset=".62" stopColor="#202826" />
          <stop offset="1" stopColor="#050606" />
        </linearGradient>
        <linearGradient id={id("sill")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".7" />
        </linearGradient>
        <radialGradient id={id("lamp")}>
          <stop offset="0" stopColor="#c7ff45" stopOpacity=".5" />
          <stop offset="1" stopColor="#c7ff45" stopOpacity="0" />
        </radialGradient>
        <clipPath id={id("bodyclip")}>
          <path d={body} />
        </clipPath>
        <radialGradient id={id("rim")} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#4a5550" />
          <stop offset=".6" stopColor="#161b19" />
          <stop offset="1" stopColor="#0a0c0b" />
        </radialGradient>
        <radialGradient id={id("floor")} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#c7ff45" stopOpacity=".22" />
          <stop offset=".45" stopColor="#c7ff45" stopOpacity=".05" />
          <stop offset="1" stopColor="#c7ff45" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("fade")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".22" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={id("reflmask")}>
          <rect x="0" y="325" width="1000" height="95" fill={`url(#${id("fade")})`} />
        </mask>
      </defs>

      {/* floor glow + contact shadow */}
      <ellipse cx="500" cy="328" rx="520" ry="60" fill={`url(#${id("floor")})`} />
      <ellipse cx="500" cy="326" rx="430" ry="10" fill="#000" opacity=".9" />

      <g>{car}</g>

      {/* wet-floor reflection */}
      <g mask={`url(#${id("reflmask")})`} opacity=".85">
        <g transform="matrix(1 0 0 -1 0 652)">{car}</g>
      </g>
    </svg>
  );
}
