// next/link and next/image auto-prefix basePath; plain <img src> doesn't.
// Use this for any local asset rendered through a raw <img> tag.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(src: string): string {
	if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;
	return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
}
