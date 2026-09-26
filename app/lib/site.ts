export const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ||
	// "https://mohammedfirdous.me", // domain expired — swap back once a new one is bought
	"https://mohammedfirdouss.github.io/portfolio";

// Where the "subscribe" nav link goes. Set this to your newsletter's signup
// page (e.g. "https://buttondown.com/<name>") once you have one; until then
// the link falls back to the RSS feed.
export const newsletterUrl: string | null = null;
