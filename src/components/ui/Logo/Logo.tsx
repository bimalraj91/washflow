import styles from "./Logo.module.scss";

/**
 * Mark: a droplet drawn with automotive precision — a chamfered teardrop cut
 * by a single "speed line" that doubles as a W stroke.
 */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={styles.mark}
    >
      <path
        d="M16 2.5 6.2 15.4a11 11 0 0 0-1.7 5.9C4.5 27 9.6 30 16 30s11.5-3 11.5-8.7c0-2.1-.6-4.1-1.7-5.9L16 2.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9.5 18.5 3 6 3.5-6.5 3.5 6.5 3-6"
        stroke="var(--volt)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <span className={styles.logo}>
      <LogoMark />
      <span className={styles.word}>
        WASH<span>FLOW</span>
      </span>
    </span>
  );
}
