import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { TransactionFeed, IncomeExpense } from "./FinanceWidgets";
import styles from "./FinancialManagement.module.scss";

export function FinancialManagement() {
  return (
    <section id="finance" className={styles.section} aria-labelledby="finance-title">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Transactions & expenses"
          id="finance-title"
          title={
            <>
              Every rupee in. <em>Every rupee out.</em>
            </>
          }
        />

        <div className={styles.layout}>
          <div className={styles.colA}>
            <div className={styles.copyBlock} data-reveal>
              <h3>Transaction management</h3>
              <p>
                Car wash payment tracking that sorts itself: daily transactions, payment records and history,
                categorised by Cash, UPI, Card or Bank — with filters that make end-of-day reconciliation a two-minute
                job.
              </p>
            </div>
            <div data-reveal>
              <TransactionFeed />
            </div>
          </div>

          <div className={styles.colB}>
            <div className={styles.copyBlock} data-reveal>
              <h3>Expense management</h3>
              <p>
                Record business expenses by category and see income against expense, daily or monthly. Car wash income
                and expense management that finally shows the real margin.
              </p>
            </div>
            <div data-reveal>
              <IncomeExpense />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
