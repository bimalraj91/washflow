import styles from "./Charts.module.scss";

const COLORS = { c1: "#C7FF45", c2: "#38B6D8" } as const;

/** Chart legend — identity is always named in text, never colour alone. */
export function Legend({ items }: { items: Array<{ label: string; color: keyof typeof COLORS }> }) {
  return (
    <ul className={styles.legend}>
      {items.map((i) => (
        <li key={i.label}>
          <i style={{ background: COLORS[i.color] }} aria-hidden="true" />
          {i.label}
        </li>
      ))}
    </ul>
  );
}
