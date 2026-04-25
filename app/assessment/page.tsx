import Link from "next/link";
import { Footer } from "../../components/Footer";
import styles from "./page.module.css";

export default function AssessmentIntroPage() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>Create Account</h1>
        <p>Complete this quick assessment to verify your skills in:</p>
        <ul>
          <li>Text annotation & labeling</li>
          <li>Sentence arrangement</li>
          <li>Content classification</li>
          <li>Data categorization</li>
          <li>Pattern recognition</li>
        </ul>
        <Link href="/assessment/1" className={styles.start}>Start Assessment</Link>
      </section>
      <Footer />
    </main>
  );
}
