"use client";

import { useEffect, useState } from "react";

const fakeRows = [
  "Amina K. withdrew $18",
  "John M. withdrew $27",
  "Grace T. withdrew $35",
  "Samuel P. withdrew $24",
  "Ruth N. withdrew $42"
];

export function FakeWithdrawals() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((x) => (x + 1) % fakeRows.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: "#7e22ce", border: "2px solid #facc15", borderRadius: 12, padding: 10, color: "#facc15" }}>
      <strong>Live withdrawals</strong>
      <p style={{ margin: "8px 0 0", animation: "pulse 2.2s infinite" }}>{fakeRows[index]}</p>
      <style>{`@keyframes pulse {0%{opacity:0.2}50%{opacity:1}100%{opacity:0.2}}`}</style>
    </div>
  );
}
