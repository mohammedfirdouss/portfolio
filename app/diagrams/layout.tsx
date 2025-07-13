import type { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagrams | Portfolio",
  description: "Visual diagrams and technical illustrations."
};

export default function DiagramsLayout({ children }: { children: ReactNode }) {
  return <section className="mx-auto max-w-2xl px-4 py-8">{children}</section>;
}
