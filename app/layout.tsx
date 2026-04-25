import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tasking Skill Portal",
  description: "Mobile-first task and assessment portal"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
