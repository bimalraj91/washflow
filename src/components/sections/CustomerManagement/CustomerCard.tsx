"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BellRing, Check, Copy, Phone, Mail, Send, Layers } from "lucide-react";
import { CUSTOMER } from "@/lib/mockData";
import { DemoTag } from "@/components/mockups/Frames";
import { cx, formatINR } from "@/lib/utils";
import styles from "./CustomerManagement.module.scss";

type SendState = "idle" | "sending" | "sent";

export function CustomerCard() {
  const [send, setSend] = useState<SendState>("idle");
  const [settled, setSettled] = useState(false);
  const [reminded, setReminded] = useState(false);
  const [copied, setCopied] = useState(false);
  const due = settled ? 0 : CUSTOMER.due;
  const invoiceNo = "INV-2611-0482";

  const sendInvoice = () => {
    if (send !== "idle") return;
    setSend("sending");
    setTimeout(() => setSend("sent"), 1300);
    setTimeout(() => setSend("idle"), 4200);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(invoiceNo);
    } catch {
      /* clipboard can be blocked; still show feedback for the demo */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={styles.customer}>
      <div className={styles.cHead}>
        <span className={styles.cAvatar}>AM</span>
        <div className={styles.cWho}>
          <p className={styles.cName}>{CUSTOMER.name}</p>
          <p className={styles.cSince}>{CUSTOMER.since}</p>
        </div>
        <DemoTag />
      </div>

      <div className={styles.contact}>
        <span>
          <Phone size={13} aria-hidden="true" /> {CUSTOMER.phone}
        </span>
        <span>
          <Mail size={13} aria-hidden="true" /> {CUSTOMER.email}
        </span>
      </div>

      <div className={styles.vehicles}>
        {CUSTOMER.vehicles.map((v) => (
          <span key={v} className={styles.vPlate}>
            {v}
          </span>
        ))}
      </div>

      <div className={cx(styles.due, settled && styles.dueClear)}>
        <div>
          <p className={styles.dueLabel}>{settled ? "Account settled" : "Outstanding balance"}</p>
          <motion.p key={due} className={styles.dueValue} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {formatINR(due)}
          </motion.p>
          <p className={styles.dueMeta}>{settled ? "Bulk payment recorded · 3 washes" : "3 unpaid washes · oldest 28 days"}</p>
        </div>
        <button type="button" className={styles.bulk} onClick={() => setSettled((s) => !s)} aria-pressed={settled}>
          {settled ? <Check size={15} aria-hidden="true" /> : <Layers size={15} aria-hidden="true" />}
          {settled ? "Undo" : "Bulk pay all"}
        </button>
      </div>

      <div className={styles.ledger} role="table" aria-label="Demo customer ledger">
        <div className={cx(styles.lRow, styles.lHead)} role="row">
          <span role="columnheader">Date</span>
          <span role="columnheader">Entry</span>
          <span role="columnheader">Debit</span>
          <span role="columnheader">Credit</span>
        </div>
        {CUSTOMER.ledger.map((l) => (
          <div key={l.date + l.label} className={styles.lRow} role="row">
            <span role="cell" className={styles.lDate}>{l.date}</span>
            <span role="cell">{l.label}</span>
            <span role="cell" className="tabular">{l.debit ? formatINR(l.debit) : "—"}</span>
            <span role="cell" className={cx("tabular", l.credit > 0 && styles.credit)}>{l.credit ? formatINR(l.credit) : "—"}</span>
          </div>
        ))}
        <AnimatePresence>
          {settled && (
            <motion.div
              className={cx(styles.lRow, styles.lNew)}
              role="row"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <span role="cell" className={styles.lDate}>Today</span>
              <span role="cell">Bulk payment · UPI</span>
              <span role="cell">—</span>
              <span role="cell" className={cx("tabular", styles.credit)}>{formatINR(CUSTOMER.due)}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.invoice}>
        <button type="button" className={styles.invNo} onClick={copy} aria-label={`Copy invoice number ${invoiceNo}`}>
          <span className="tabular">{invoiceNo}</span>
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          <span className={styles.copied} aria-live="polite">
            {copied ? "Copied" : ""}
          </span>
        </button>
        <div className={styles.actions}>
          <button type="button" className={cx(styles.remind, reminded && styles.reminded)} onClick={() => setReminded(true)} disabled={settled || reminded}>
            {reminded ? <Check size={14} aria-hidden="true" /> : <BellRing size={14} aria-hidden="true" />}
            {reminded ? "Reminder sent" : "Remind"}
          </button>
          <button type="button" className={cx(styles.send, styles[send])} onClick={sendInvoice} aria-live="polite">
            <span className={styles.sendTrack}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={send}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className={styles.sendLabel}
                >
                  {send === "idle" && (
                    <>
                      <Send size={14} aria-hidden="true" /> Send invoice
                    </>
                  )}
                  {send === "sending" && (
                    <>
                      <motion.span animate={{ x: [0, 40], y: [0, -20], opacity: [1, 0] }} transition={{ duration: 0.9, ease: "easeIn" }}>
                        <Send size={14} aria-hidden="true" />
                      </motion.span>
                      Sending…
                    </>
                  )}
                  {send === "sent" && (
                    <>
                      <Check size={14} aria-hidden="true" /> Invoice shared
                    </>
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
