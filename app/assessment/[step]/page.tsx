import Link from "next/link";
import { notFound } from "next/navigation";
import { quizzes } from "../../../data/quiz";
import { Footer } from "../../../components/Footer";
import styles from "./page.module.css";

export default function QuizPage({ params }: { params: { step: string } }) {
  const step = Number(params.step);
  const quiz = quizzes.find((q) => q.id === step);
  if (!quiz) return notFound();
  const nextHref = step < quizzes.length ? `/assessment/${step + 1}` : "/assessment/passed";
  const actionText = step < quizzes.length ? "Next Quiz" : "Submit Assessment";

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <h1>{quiz.id}. {quiz.title}</h1>
        <p>{quiz.prompt}</p>
        <p className={styles.sample}>{quiz.sample}</p>
        <textarea placeholder="Write your solution here" rows={5} />
        <Link href={nextHref} className={styles.next}>{actionText}</Link>
      </section>
      <Footer />
    </main>
  );
}
