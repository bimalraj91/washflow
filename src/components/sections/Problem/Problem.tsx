import { ProblemBoard } from "./ProblemBoard";
import styles from "./Problem.module.scss";

export function Problem() {
  return (
    <section className={styles.section} aria-labelledby="problem-title">
      <div className="container">
        <p className={styles.eyebrow} data-reveal="fade">
          <span>02</span> The problem
        </p>
        <h2 id="problem-title" className={styles.title}>
          <span data-reveal>The business</span>
          <span data-reveal>
            is <em>moving.</em>
          </span>
          <span data-reveal className={styles.indent}>
            Your system
          </span>
          <span data-reveal className={styles.indent}>
            should too.
          </span>
        </h2>

        <div className={styles.body}>
          <div className={styles.copy} data-reveal>
            <p>
              Most car washes still run on a notebook at the counter, a spreadsheet at home and a lot of memory. Cars
              keep coming — but the records don&apos;t keep up.
            </p>
            <p>
              Dues slip. Salaries get calculated twice. Nobody knows the real profit until the month is already over.
            </p>
          </div>
          <ProblemBoard />
        </div>
      </div>
    </section>
  );
}
