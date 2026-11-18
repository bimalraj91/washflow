import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { StatusChip } from "@/components/ui/StatusChip/StatusChip";
import { CarRender } from "@/components/mockups/CarRender";
import { DemoTag } from "@/components/mockups/Frames";
import { VEHICLE } from "@/lib/mockData";
import { formatINR } from "@/lib/utils";
import { CustomerCard } from "./CustomerCard";
import styles from "./CustomerManagement.module.scss";

export function CustomerManagement() {
  return (
    <section id="solutions" className={styles.section} aria-labelledby="customers-title">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Customers & vehicles"
          id="customers-title"
          align="split"
          title={
            <>
              Know every car. <em>Every customer.</em> Every due.
            </>
          }
          intro={
            <p>
              Car wash customer management with a full ledger behind every name: vehicles, wash history, payments and
              outstanding balance — plus bulk payments, invoice sharing and payment reminders when money is due.
            </p>
          }
        />

        <div className={styles.grid}>
          {/* Vehicle profile */}
          <article className={styles.vehicle} data-reveal aria-label="Demo vehicle profile">
            <div className={styles.vTop}>
              <span className={styles.vLabel}>Vehicle profile</span>
              <DemoTag />
            </div>
            <div className={styles.vVisual} data-parallax="0.12">
              <CarRender className={styles.vCar} title="Vehicle profile image — black SUV" />
            </div>
            <p className={styles.plate}>{VEHICLE.reg}</p>
            <h3 className={styles.vModel}>{VEHICLE.model}</h3>
            <dl className={styles.specs}>
              <div>
                <dt>Type</dt>
                <dd>{VEHICLE.type}</dd>
              </div>
              <div>
                <dt>Colour</dt>
                <dd>{VEHICLE.colour}</dd>
              </div>
              <div>
                <dt>Owner</dt>
                <dd>{VEHICLE.owner}</dd>
              </div>
              <div>
                <dt>Washes</dt>
                <dd className="tabular">{VEHICLE.washes}</dd>
              </div>
              <div>
                <dt>Lifetime value</dt>
                <dd className="tabular volt">{formatINR(VEHICLE.lifetime)}</dd>
              </div>
            </dl>

            <p className={styles.histLabel}>Wash & payment history</p>
            <ol className={styles.history}>
              {VEHICLE.history.map((h) => (
                <li key={h.date}>
                  <span className={styles.hDate}>{h.date}</span>
                  <span className={styles.hService}>{h.service}</span>
                  <span className="tabular">{formatINR(h.amount)}</span>
                  <StatusChip status={h.status} />
                </li>
              ))}
            </ol>
          </article>

          {/* Customer profile + ledger */}
          <div data-reveal className={styles.customerWrap}>
            <CustomerCard />
          </div>
        </div>
      </div>
    </section>
  );
}
