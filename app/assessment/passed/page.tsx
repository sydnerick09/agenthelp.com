import Link from "next/link";
import { Footer } from "../../../components/Footer";
import styles from "./page.module.css";

export default function PassedPage() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>Screening passed</h1>
        <p>Qualified for AI training test.</p>
        <Link href="/bonus" className={styles.go}>Continue</Link>
      </section>
      <Footer />
    </main>
  );
}
