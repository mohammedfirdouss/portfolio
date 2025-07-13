import type { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source | Portfolio",
  description: "A collection of my open-source contributions and projects."
};

export default function OpenSourceLayout({ children }: { children: ReactNode }) {
  return <section className="mx-auto max-w-2xl px-4 py-8">{children}</section>;
}
