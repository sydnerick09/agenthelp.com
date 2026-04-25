"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { countries } from "../../data/countries";
import { Footer } from "../../components/Footer";
import styles from "./page.module.css";

async function hashValue(value: string) {
  const data = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function CreateAccountPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [country, setCountry] = useState("United States");
  const navCountries = useMemo(() => countries.slice(0, 20), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    if (password !== confirm) {
      setError("Passwords must match.");
      return;
    }
    const hashedPassword = await hashValue(password);
    const name = String(form.get("fullName") || "User");
    sessionStorage.setItem("taskUser", JSON.stringify({
      name,
      phone: form.get("phone"),
      email: form.get("email"),
      country,
      passwordHash: hashedPassword
    }));
    router.push("/assessment");
  }

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>Create Account</h1>
        <nav className={styles.nav}>
          {navCountries.map((item) => (
            <button key={item} type="button" className={country === item ? styles.active : styles.navButton} onClick={() => setCountry(item)}>{item}</button>
          ))}
        </nav>
        <form onSubmit={onSubmit} className={styles.form}>
          <input name="fullName" placeholder="Full names" required />
          <input name="phone" placeholder="Phone number" required />
          <input name="email" type="email" placeholder="Email address" required />
          <select name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
            {countries.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input name="password" type="password" placeholder="Password" required />
          <input name="confirm" type="password" placeholder="Confirm password" required />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.cta}>Create Account Icon</button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
