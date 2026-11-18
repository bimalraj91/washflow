import { Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { DemoTag } from "@/components/mockups/Frames";
import { ATTENDANCE, EMPLOYEES } from "@/lib/mockData";
import { cx } from "@/lib/utils";
import { Payroll } from "./Payroll";
import styles from "./EmployeeManagement.module.scss";

const KEY: Record<string, { label: string; cls: string }> = {
  P: { label: "Present", cls: "p" },
  A: { label: "Absent", cls: "a" },
  H: { label: "Half day", cls: "h" },
  O: { label: "Weekly off", cls: "o" },
};

export function EmployeeManagement() {
  const names = Object.keys(ATTENDANCE);
  return (
    <section id="team" className={styles.section} aria-labelledby="team-title">
      <div className="container">
        <SectionHeading
          index="07"
          eyebrow="Employees · Attendance · Salary"
          id="team-title"
          title={
            <>
              Your crew, <em>fully</em> accounted for.
            </>
          }
          intro={
            <p>
              Car wash employee management covering profiles, roles, attendance and salary — including advances and
              credit taken against pay, with transfer references for every payment.
            </p>
          }
          align="split"
        />

        <div className={styles.bento}>
          {/* Employee directory */}
          <article className={cx(styles.card, styles.staff)} data-reveal aria-label="Demo employee directory">
            <div className={styles.cardTop}>
              <p className={styles.cardLabel}>Team · 5 employees</p>
              <DemoTag />
            </div>
            <ul className={styles.people}>
              {EMPLOYEES.map((e, i) => (
                <li key={e.name}>
                  <span className={styles.avatar} data-hue={i % 3}>
                    {e.name.split(" ").map((p) => p[0]).join("")}
                  </span>
                  <span className={styles.who}>
                    <b>{e.name}</b>
                    <small>{e.role}</small>
                  </span>
                  <span className={styles.since}>{["Since 2021", "Since 2022", "Since 2023", "Since 2024", "Since 2024"][i]}</span>
                  <span className={styles.call} aria-hidden="true">
                    <Phone size={13} />
                  </span>
                </li>
              ))}
            </ul>
            <dl className={styles.staffFoot}>
              <div>
                <dt>On shift now</dt>
                <dd>
                  <span className="volt">4</span> / 5
                </dd>
              </div>
              <div>
                <dt>Salary advances</dt>
                <dd className="tabular">₹4,000</dd>
              </div>
              <div>
                <dt>Monthly payroll</dt>
                <dd className="tabular">₹89,000</dd>
              </div>
            </dl>
          </article>

          {/* Attendance */}
          <article className={cx(styles.card, styles.attendance)} data-reveal aria-label="Demo attendance for November">
            <div className={styles.cardTop}>
              <p className={styles.cardLabel}>Attendance · November</p>
              <p className={styles.attSum}>
                <b>96.2%</b> present
              </p>
            </div>
            <div className={styles.attScroll} data-lenis-prevent-wheel="">
              <table className={styles.attTable}>
                <caption className="sr-only">Daily attendance, 1–30 November (demo data)</caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Employee</span>
                    </th>
                    {Array.from({ length: 30 }, (_, d) => (
                      <th key={d} scope="col" className={styles.day}>
                        {d + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {names.map((n) => (
                    <tr key={n}>
                      <th scope="row" className={styles.attName}>
                        {n.split(" ")[0]}
                      </th>
                      {ATTENDANCE[n].split("").map((c, d) => (
                        <td key={d} className={styles[KEY[c].cls]} title={`${n}, ${d + 1} Nov: ${KEY[c].label}`}>
                          {c === "P" ? <span className="sr-only">P</span> : c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className={styles.attKey}>
              {Object.entries(KEY).map(([k, v]) => (
                <li key={k}>
                  <span className={styles[v.cls]}>{k === "P" ? "" : k}</span>
                  {v.label}
                </li>
              ))}
            </ul>
          </article>

          {/* Payroll */}
          <article className={cx(styles.card, styles.pay)} data-reveal aria-label="Demo salary management">
            <Payroll />
          </article>
        </div>
      </div>
    </section>
  );
}
