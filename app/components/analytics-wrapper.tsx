"use client";

import { usePathname } from "next/navigation";
import Analytics from "./analytics";

export default function AnalyticsWrapper() {
  const pathname = usePathname();
  return pathname ? <Analytics pathname={pathname} /> : null;
}