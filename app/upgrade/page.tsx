"use client";

import { useState } from "react";
import { Footer } from "../../components/Footer";
import styles from "./page.module.css";

const plans = [
  { key: "beginner", name: "Beginner", details: "5 Tasks/day • $1.5-3 / task", price: "$5/month" },
  { key: "average", name: "Average skilled (Popular)", details: "9 Tasks/day • $2.8-5 / task", price: "$10/month" },
  { key: "pro", name: "13 Tasks/day", details: "13 Tasks/day • $3.5-8 / task", price: "$13/month" },
  { key: "expert", name: "Expert", details: "15 Tasks/day • $3.5-9 / task", price: "$15/month" }
] as const;

export default function UpgradePage() {
  const [msg, setMsg] = useState("");

  async function payMpesa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const phone = String(form.get("phone") || "");
    const amount = Number(form.get("amount") || 0);
    const res = await fetch("/api/mpesa/stk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, amount })
    });
    const data = await res.json();
    setMsg(data.message || "Request sent.");
  }

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>Account package plan required</h1>
        <p>Choose plan</p>
        <div className={styles.grid}>
          {plans.map((plan) => (
            <a
              key={plan.key}
              href="https://www.paypal.com/"
              target="_blank"
              className={styles.plan}
              onClick={() => sessionStorage.setItem("accountPlan", plan.key === "pro" ? "average" : (plan.key as string))}
              rel="noreferrer"
            >
              <h2>{plan.name}</h2>
              <p>{plan.details}</p>
              <strong>{plan.price}</strong>
              <span>Pay with PayPal</span>
            </a>
          ))}
        </div>

        <h2>Real payment (M-Pesa STK - Daraja API)</h2>
        <form className={styles.form} onSubmit={payMpesa}>
          <input name="phone" placeholder="2547XXXXXXXX" required />
          <input name="amount" placeholder="Amount" type="number" min={1} required />
          <button type="submit">Pay with M-Pesa STK</button>
        </form>
        {msg && <p className={styles.msg}>{msg}</p>}
      </section>
      <Footer />
    </main>
  );
}
