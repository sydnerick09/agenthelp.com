export type PlanType = "free" | "beginner" | "average" | "expert";

const ranges: Record<PlanType, [number, number]> = {
  free: [1.5, 3],
  beginner: [1.5, 3],
  average: [2.8, 5],
  expert: [3.5, 9]
};

export function generateTasks(plan: PlanType) {
  const [min, max] = ranges[plan];
  return Array.from({ length: 30 }, (_, i) => {
    const amount = (min + ((max - min) / 29) * i).toFixed(2);
    return { title: `Task ${i + 1}`, amount: `$${amount}` };
  });
}
