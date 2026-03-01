export async function getViewCount(slug: string): Promise<number> {
  try {
    const kv = (process.env as any).ANALYTICS;
    if (!kv) return 0;
    
    const count = await kv.get(`views:${slug}`);
    return count ? parseInt(count) : 0;
  } catch {
    return 0;
  }
}

export async function incrementView(slug: string): Promise<void> {
  try {
    const kv = (process.env as any).ANALYTICS;
    if (!kv) return;
    
    const current = await getViewCount(slug);
    await kv.put(`views:${slug}`, (current + 1).toString());
  } catch {
    // Fail silently
  }
}
