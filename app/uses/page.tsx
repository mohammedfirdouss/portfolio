import { Mdx } from "@/app/components/mdx";
import { Navigation } from "@/app/components/nav";
import { Card } from "@/app/components/card";
import { Laptop, Cpu, Command } from "lucide-react";
import { notFound } from "next/navigation";

export default function UsesPage() {
	// No uses document available - always return not found
	notFound();
}
