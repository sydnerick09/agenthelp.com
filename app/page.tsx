import Link from "next/link";
import { Footer } from "../components/Footer";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>Welcome to your daily task website</h1>
        <p>Complete quick assessments, unlock tasks, and track your rewards.</p>
        <h2>What is offered</h2>
        <ul>
          <li>Text annotation & labeling</li>
          <li>Sentence arrangement</li>
          <li>Content classification</li>
          <li>Data categorization</li>
          <li>Pattern recognition</li>
        </ul>
        <label className={styles.terms}>
          <input type="checkbox" required /> Agree to terms and conditions
        </label>
        <Link href="/create-account" className={styles.iconButton}>Create Account Icon</Link>
      </section>
      <Footer />
    </main>
  );
}
