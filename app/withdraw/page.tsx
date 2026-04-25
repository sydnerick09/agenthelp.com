import { Footer } from "../../components/Footer";
import styles from "./page.module.css";

export default function WithdrawPage() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>Withdraw funds</h1>
        <p>Available funds: <strong>$10.00</strong></p>
        <form className={styles.form}>
          <input placeholder="Withdraw amount" required />
          <input placeholder="Full name" required />
          <input placeholder="Phone number" required />
          <button type="submit">Submit withdrawal</button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
