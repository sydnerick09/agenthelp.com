import Link from "next/link";
import { Footer } from "../../components/Footer";
import styles from "./page.module.css";

export default function BonusPage() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>Welcome bonus</h1>
        <p>You have earned $10 credit to available balance.</p>
        <Link href="/dashboard" className={styles.btn}>Continue and Claim</Link>
      </section>
      <Footer />
    </main>
  );
}
