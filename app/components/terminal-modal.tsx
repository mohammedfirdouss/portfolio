"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Maximize2, Minimize2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Command {
	input: string;
	output: React.ReactNode;
}

export function TerminalModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState("");
	const [history, setHistory] = useState<Command[]>([]);
	const [isMaximized, setIsMaximized] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	const commands: Record<string, (args: string[]) => React.ReactNode> = {
		help: () => (
			<div className="space-y-1 text-zinc-300">
				<p>Available commands:</p>
				<div className="grid grid-cols-[100px_1fr] gap-2">
					<span className="text-emerald-400">about</span>
					<span>Display profile info</span>
					<span className="text-emerald-400">projects</span>
					<span>List projects</span>
					<span className="text-emerald-400">opensource</span>
					<span>Show open source contributions</span>
					<span className="text-emerald-400">experience</span>
					<span>Show work experience</span>
					<span className="text-emerald-400">stack</span>
					<span>Display tech stack</span>
					<span className="text-emerald-400">blog</span>
					<span>List blog posts</span>
					<span className="text-emerald-400">goto</span>
					<span>Navigate (e.g., goto /blog)</span>
					<span className="text-emerald-400">clear</span>
					<span>Clear terminal</span>
					<span className="text-emerald-400">contact</span>
					<span>Show contact info</span>
					<span className="text-emerald-400">whoami</span>
					<span>Current user session</span>
				</div>
			</div>
		),
		whoami: () => (
			<span className="text-zinc-300">guest@mohammed-firdous-portfolio</span>
		),
		about: () => (
			<div className="text-zinc-300 max-w-lg">
				Cloud Engineer & Backend Developer. 3x Hackathon Winner.
				<br />
				Specializing in AWS, Serverless, and Automation.
			</div>
		),
		opensource: () => (
			<div className="grid grid-cols-1 gap-1 text-zinc-300">
				<span>- GitLab CLI: Added documentation for fork behavior (Go)</span>
				<span>- GitLab CLI: Standardized schedule command help formatting</span>
				<span>- GitLab CLI: Standardized run command help formatting</span>
			</div>
		),
		experience: () => (
			<div className="grid grid-cols-1 gap-1 text-zinc-300">
				<span>
					<span className="text-emerald-400">Swype</span> (Back End Developer)
				</span>
				<span className="pl-4 text-zinc-500">
					Built payments & wallet APIs. Improved transaction speed by 5%.
				</span>
				<span>
					<span className="text-emerald-400">Nithub</span> (DevOps Engineer)
				</span>
				<span className="pl-4 text-zinc-500">
					Automated CI/CD with GitHub Actions. Maintained code quality.
				</span>
			</div>
		),
		stack: () => (
			<div className="grid grid-cols-1 gap-1 text-zinc-300">
				<span>
					<span className="text-emerald-400">Cloud:</span> AWS, GCP
				</span>
				<span>
					<span className="text-emerald-400">DevOps:</span> Docker, Kubernetes,
					Terraform, GitHub Actions
				</span>
				<span>
					<span className="text-emerald-400">AI:</span> OpenAI, Anthropic,
					LangChain, PyTorch
				</span>
				<span>
					<span className="text-emerald-400">Languages:</span> Python, TypeScript,
					Go, Bash
				</span>
			</div>
		),
		blog: () => (
			<div className="grid grid-cols-1 gap-1 text-zinc-300">
				<span>- 3 Tier Architecture using AWS CloudFormation</span>
				<span>- Understanding Docker</span>
				<span>- Why a Serverless Mindset Matters</span>
				<span>- MCPs and APIs</span>
			</div>
		),
		contact: () => (
			<div className="text-zinc-300">
				<p>GitHub: github.com/mohammedfirdouss</p>
				<p>Twitter: @iamfirdouss</p>
				<p>LinkedIn: linkedin.com/in/mohammedfirdousaraoye</p>
			</div>
		),
		projects: () => (
			<div className="grid grid-cols-1 gap-1 text-zinc-300">
				<span>- Cruddur (AWS Serverless Social Media)</span>
				<span>- TerraTowns (Terraform Learning Platform)</span>
				<span>- BloomRefresh (Automation Tool)</span>
			</div>
		),
		goto: (args) => {
			if (!args[0])
				return <span className="text-red-400">Usage: goto [path]</span>;
			const path = args[0].startsWith("/") ? args[0] : `/${args[0]}`;
			router.push(path);
			setTimeout(() => setIsOpen(false), 800);
			return <span className="text-emerald-400">Navigating to {path}...</span>;
		},
		clear: () => {
			setHistory([]);
			return null;
		},
	};

	const handleCommand = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = input.trim();
		if (!trimmed) return;

		const [cmd, ...args] = trimmed.split(" ");
		const commandFn = commands[cmd.toLowerCase()];

		const output = commandFn ? (
			commandFn(args)
		) : (
			<span className="text-red-400">
				Command not found: {cmd}. Type 'help' for available commands.
			</span>
		);

		if (cmd.toLowerCase() !== "clear") {
			setHistory((prev) => [...prev, { input: trimmed, output }]);
		}
		setInput("");
	};

	// Auto-scroll to bottom
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [history]);

	// Keyboard shortcut (Ctrl+J or Cmd+J)
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "j") {
				e.preventDefault();
				setIsOpen((prev) => !prev);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	// Focus input when opened
	useEffect(() => {
		if (isOpen) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	}, [isOpen]);

	return (
		<>
			{/* Floating Toggle Button */}
			<motion.button
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.1 }}
				onClick={() => setIsOpen(true)}
				className="fixed bottom-6 right-6 z-50 p-3 bg-zinc-900 border border-zinc-800 rounded-full shadow-2xl text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300"
				title="Open Terminal (⌘+J)"
			>
				<Terminal size={20} />
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							transition={{ duration: 0.2 }}
							className={`relative flex flex-col w-full bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden ${
								isMaximized ? "h-full max-w-none m-0" : "max-w-3xl h-[600px]"
							}`}
						>
							{/* Terminal Header */}
							<div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 select-none cursor-move">
								<div className="flex items-center gap-2">
									<div className="flex gap-2 mr-2">
										<button
											onClick={() => setIsOpen(false)}
											className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
										/>
										<button
											onClick={() => setIsMaximized(!isMaximized)}
											className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
										/>
										<button
											onClick={() => setIsMaximized(!isMaximized)}
											className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
										/>
									</div>
									<div className="flex items-center gap-2 text-sm text-zinc-400 font-mono">
										<Terminal size={14} />
										<span>guest@mohammed-firdous:~</span>
									</div>
								</div>
								<div className="flex items-center gap-2 text-zinc-500">
									<button
										onClick={() => setIsMaximized(!isMaximized)}
										className="p-1 hover:text-zinc-300 transition-colors"
									>
										{isMaximized ? (
											<Minimize2 size={14} />
										) : (
											<Maximize2 size={14} />
										)}
									</button>
									<button
										onClick={() => setIsOpen(false)}
										className="p-1 hover:text-zinc-300 transition-colors"
									>
										<X size={14} />
									</button>
								</div>
							</div>

							{/* Terminal Body */}
							<div
								ref={scrollRef}
								className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-black/95 text-zinc-300 custom-scrollbar"
								onClick={() => inputRef.current?.focus()}
							>
								<div className="mb-4 text-zinc-500">
									Welcome to Firdous OS v1.0.0
									<br />
									Type 'help' to see available commands.
								</div>

								{history.map((entry, i) => (
									<div key={i} className="mb-2">
										<div className="flex gap-2">
											<span className="text-emerald-500">➜</span>
											<span className="text-blue-400">~</span>
											<span>{entry.input}</span>
										</div>
										<div className="pl-6 mt-1 text-zinc-400">
											{entry.output}
										</div>
									</div>
								))}

								<form
									onSubmit={handleCommand}
									className="flex gap-2 items-center mt-2"
								>
									<span className="text-emerald-500">➜</span>
									<span className="text-blue-400">~</span>
									<input
										ref={inputRef}
										type="text"
										value={input}
										onChange={(e) => setInput(e.target.value)}
										className="flex-1 bg-transparent border-none outline-none text-zinc-200 placeholder-zinc-700"
										autoFocus
										spellCheck={false}
										autoComplete="off"
									/>
								</form>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
}
