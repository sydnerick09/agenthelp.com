"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { FakeWithdrawals } from "../../components/FakeWithdrawals";
import { generateTasks, PlanType } from "../../data/tasks";
import styles from "./page.module.css";

export default function DashboardPage() {
  const [name, setName] = useState("User");
  const [plan, setPlan] = useState<PlanType>("free");

  useEffect(() => {
    const raw = sessionStorage.getItem("taskUser");
    const rawPlan = sessionStorage.getItem("accountPlan") as PlanType | null;
    if (raw) {
      const parsed = JSON.parse(raw) as { name?: string };
      setName(parsed.name || "User");
    }
    if (rawPlan) setPlan(rawPlan);
  }, []);

  const tasks = generateTasks(plan);

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>Welcome back</h1>
        <p>User name: <strong>{name}</strong></p>
        <div className={styles.balance}>Available balance: <strong>$10.00</strong> <Link href="/withdraw" className={styles.small}>Withdrawal Icon</Link></div>

        <div className={styles.metrics}>
          <div><strong>Task</strong><p>400+</p></div>
          <div><strong>Available</strong><p>24 hrs</p></div>
          <div><strong>Active users</strong><p>2,830</p></div>
        </div>

        <FakeWithdrawals />

        <div className={styles.accountType}>
          <p>Account type: {plan === "free" ? "Free account" : plan}</p>
          <Link href="/upgrade" className={styles.small}>Upgrade Icon</Link>
        </div>

        <h2>Tasking</h2>
        <div className={styles.tasks}>
          {tasks.map((task) => (
            <article key={task.title} className={styles.task}>
              <h3>{task.title}</h3>
              <p>Amount: {task.amount}</p>
              <Link href="/upgrade" className={styles.up}>Upgrade</Link>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
