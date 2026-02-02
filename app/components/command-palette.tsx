"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
	Command,
	Search,
	Home,
	FolderKanban,
	BookOpen,
	GitBranch,
	FileImage,
	Mail,
	Github,
	Linkedin,
	ExternalLink,
	X,
	Briefcase,
} from "lucide-react";

// Custom X (formerly Twitter) Icon component
const XIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" className={className} fill="currentColor">
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

interface CommandItem {
	id: string;
	title: string;
	subtitle?: string;
	icon: React.ReactNode;
	action: () => void;
	category: "navigation" | "social" | "actions";
	href?: string;
}

export function CommandPalette() {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const router = useRouter();
	const pathname = usePathname();

	const commands: CommandItem[] = [
		// Navigation
		{
			id: "home",
			title: "Home",
			subtitle: "Go to homepage",
			icon: <Home className="w-4 h-4" />,
			action: () => router.push("/"),
			category: "navigation",
			href: "/",
		},
		{
			id: "experience",
			title: "Experience",
			subtitle: "View career history",
			icon: <Briefcase className="w-4 h-4" />,
			action: () => router.push("/experience"),
			category: "navigation",
			href: "/experience",
		},
		{
			id: "projects",
			title: "Projects",
			subtitle: "View all projects",
			icon: <FolderKanban className="w-4 h-4" />,
			action: () => router.push("/projects"),
			category: "navigation",
			href: "/projects",
		},
		{
			id: "blog",
			title: "Blog",
			subtitle: "Read blog posts",
			icon: <BookOpen className="w-4 h-4" />,
			action: () => router.push("/blog"),
			category: "navigation",
			href: "/blog",
		},
		{
			id: "open-source",
			title: "Open Source",
			subtitle: "Open source contributions",
			icon: <GitBranch className="w-4 h-4" />,
			action: () => router.push("/open-source"),
			category: "navigation",
			href: "/open-source",
		},
		{
			id: "diagrams",
			title: "Diagrams",
			subtitle: "Technical diagrams",
			icon: <FileImage className="w-4 h-4" />,
			action: () => router.push("/diagrams"),
			category: "navigation",
			href: "/diagrams",
		},
		{
			id: "contact",
			title: "Contact",
			subtitle: "Get in touch",
			icon: <Mail className="w-4 h-4" />,
			action: () => router.push("/contact"),
			category: "navigation",
			href: "/contact",
		},
		// Social
		{
			id: "github",
			title: "GitHub",
			subtitle: "View GitHub profile",
			icon: <Github className="w-4 h-4" />,
			action: () =>
				window.open("https://github.com/mohammedfirdouss", "_blank"),
			category: "social",
		},
		{
			id: "linkedin",
			title: "LinkedIn",
			subtitle: "Connect on LinkedIn",
			icon: <Linkedin className="w-4 h-4" />,
			action: () =>
				window.open("https://linkedin.com/in/mohammedfirdouss", "_blank"),
			category: "social",
		},
		{
			id: "x",
			title: "X",
			subtitle: "Follow on X (formerly Twitter)",
			icon: <XIcon className="w-4 h-4" />,
			action: () =>
				window.open("https://twitter.com/iamfirdouss", "_blank"),
			category: "social",
		},
	];

	const filteredCommands = commands.filter(
		(cmd) =>
			cmd.title.toLowerCase().includes(search.toLowerCase()) ||
			cmd.subtitle?.toLowerCase().includes(search.toLowerCase()),
	);

	const groupedCommands = {
		navigation: filteredCommands.filter((c) => c.category === "navigation"),
		social: filteredCommands.filter((c) => c.category === "social"),
	};

	const flatFiltered = [
		...groupedCommands.navigation,
		...groupedCommands.social,
	];

	const toggle = useCallback(() => {
		setIsOpen((prev) => !prev);
		setSearch("");
		setSelectedIndex(0);
	}, []);

	const executeCommand = useCallback((command: CommandItem) => {
		command.action();
		setIsOpen(false);
		setSearch("");
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Open with Cmd+K or Ctrl+K
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				toggle();
			}

			if (!isOpen) return;

			// Close with Escape
			if (e.key === "Escape") {
				setIsOpen(false);
				setSearch("");
			}

			// Navigate with arrows
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelectedIndex((prev) =>
					prev < flatFiltered.length - 1 ? prev + 1 : 0,
				);
			}

			if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelectedIndex((prev) =>
					prev > 0 ? prev - 1 : flatFiltered.length - 1,
				);
			}

			// Execute with Enter
			if (e.key === "Enter" && flatFiltered[selectedIndex]) {
				e.preventDefault();
				executeCommand(flatFiltered[selectedIndex]);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, toggle, flatFiltered, selectedIndex, executeCommand]);

	// Reset selected index when search changes
	useEffect(() => {
		setSelectedIndex(0);
	}, [search]);

	return (
		<>
			{/* Trigger button */}
			<button
				onClick={toggle}
				className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 bg-zinc-900/90 border border-zinc-800 rounded-lg backdrop-blur-sm hover:bg-zinc-800/90 hover:text-zinc-300 transition-all duration-200 group"
			>
				<Command className="w-4 h-4" />
				<span className="hidden sm:inline">Command</span>
				<kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 bg-zinc-800 rounded border border-zinc-700">
					⌘K
				</kbd>
			</button>

			{/* Modal */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
							className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
							onClick={() => setIsOpen(false)}
						/>

						{/* Command palette */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: -20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: -20 }}
							transition={{ duration: 0.15, ease: "easeOut" }}
							className="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2"
						>
							<div className="mx-4 overflow-hidden bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-xl">
								{/* Search input */}
								<div className="flex items-center gap-3 px-4 border-b border-zinc-800">
									<Search className="w-5 h-5 text-zinc-500" />
									<input
										type="text"
										placeholder="Search commands..."
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										className="flex-1 py-4 text-sm text-zinc-100 placeholder-zinc-500 bg-transparent outline-none"
									/>
									<button
										onClick={() => setIsOpen(false)}
										className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
									>
										<X className="w-4 h-4" />
									</button>
								</div>

								{/* Commands list */}
								<div className="max-h-[60vh] overflow-y-auto py-2">
									{flatFiltered.length === 0 ? (
										<div className="px-4 py-8 text-center text-sm text-zinc-500">
											No commands found
										</div>
									) : (
										<>
											{groupedCommands.navigation.length > 0 && (
												<div>
													<div className="px-4 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">
														Navigation
													</div>
													{groupedCommands.navigation.map((cmd, idx) => (
														<CommandRow
															key={cmd.id}
															command={cmd}
															isSelected={selectedIndex === idx}
															onSelect={() => executeCommand(cmd)}
															onHover={() => setSelectedIndex(idx)}
															isCurrent={
																cmd.href
																	? pathname === cmd.href ||
																	  pathname.startsWith(`${cmd.href}/`)
																	: false
															}
														/>
													))}
												</div>
											)}

											{groupedCommands.social.length > 0 && (
												<div>
													<div className="px-4 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wider mt-2">
														Social
													</div>
													{groupedCommands.social.map((cmd, idx) => (
														<CommandRow
															key={cmd.id}
															command={cmd}
															isSelected={
																selectedIndex ===
																groupedCommands.navigation.length + idx
															}
															onSelect={() => executeCommand(cmd)}
															onHover={() =>
																setSelectedIndex(
																	groupedCommands.navigation.length + idx,
																)
															}
															isCurrent={false}
														/>
													))}
												</div>
											)}
										</>
									)}
								</div>

								{/* Footer */}
								<div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800 text-xs text-zinc-500">
									<div className="flex items-center gap-4">
										<span className="flex items-center gap-1">
											<kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">
												↑↓
											</kbd>
											Navigate
										</span>
										<span className="flex items-center gap-1">
											<kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">
												↵
											</kbd>
											Select
										</span>
										<span className="flex items-center gap-1">
											<kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700">
												esc
											</kbd>
											Close
										</span>
									</div>
								</div>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}

function CommandRow({
	command,
	isSelected,
	onSelect,
	onHover,
	isCurrent,
}: {
	command: CommandItem;
	isSelected: boolean;
	onSelect: () => void;
	onHover: () => void;
	isCurrent: boolean;
}) {
	return (
		<button
			onClick={onSelect}
			onMouseEnter={onHover}
			className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
				isSelected
					? "bg-zinc-800/80 text-zinc-100"
					: "text-zinc-400 hover:bg-zinc-800/50"
			}`}
		>
			<span
				className={`${
					isSelected
						? "text-zinc-100"
						: isCurrent
						? "text-emerald-400"
						: "text-zinc-500"
				}`}
			>
				{command.icon}
			</span>
			<div className="flex-1 min-w-0">
				<div
					className={`text-sm font-medium truncate ${
						isCurrent ? "text-emerald-400" : ""
					}`}
				>
					{command.title}
					{isCurrent && (
						<span className="ml-2 text-[10px] text-emerald-500/70 uppercase tracking-wider">
							Current
						</span>
					)}
				</div>
				{command.subtitle && (
					<div className="text-xs text-zinc-500 truncate">
						{command.subtitle}
					</div>
				)}
			</div>
			{command.category === "social" && (
				<ExternalLink className="w-3 h-3 text-zinc-600" />
			)}
		</button>
	);
}
