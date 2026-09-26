// @ts-nocheck
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { withBasePath } from "@/app/lib/asset-path";

function clsx(...args: (string | undefined | null | false)[]): string {
	return args.filter(Boolean).join(" ");
}
const ZoomImage = ({
	className,
	alt,
	src,
	...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => (
	<Zoom>
		{/* eslint-disable-next-line @next/next/no-img-element */}
		{/* rome-ignore lint/a11y/useAltText: alt is author-provided per-image via MDX ![alt](src) syntax, not a static value Rome can verify */}
		<img
			className={clsx("cursor-zoom-in", className)}
			alt={alt || ""}
			src={typeof src === "string" ? withBasePath(src) : src}
			{...props}
		/>
	</Zoom>
);

// Typography for these elements lives in the `.post-body` scope in
// global.css; only behaviour (external links, zoomable images) is set here.
const components = {
	a: ({ href, ...props }) => {
		const isExternal =
			typeof href === "string" &&
			(href.startsWith("http://") || href.startsWith("https://"));
		if (isExternal) {
			return (
				<a href={href} target="_blank" rel="noopener noreferrer" {...props} />
			);
		}
		return <Link href={href ?? ""} {...props} />;
	},
	img: ZoomImage,
	// Zoom renders a <div>, which can't sit inside a <p>, so paragraphs that
	// hold an image become a block wrapper instead.
	p: ({ children, ...props }) =>
		React.Children.toArray(children).some(
			(child) => React.isValidElement(child) && child.type === ZoomImage,
		) ? (
			<div className="mdx-figure" {...props}>
				{children}
			</div>
		) : (
			<p {...props}>{children}</p>
		),
	Image,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = useMDXComponent(code);

	return (
		<div className="mdx post-body">
			<Component components={components} />
		</div>
	);
}
