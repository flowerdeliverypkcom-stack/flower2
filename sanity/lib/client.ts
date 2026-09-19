/**
 * Sanity.io client for fetching products, categories, and blogs.
 * Configured with Next.js ISR (Incremental Static Regeneration).
 */

export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'am64tc6i';
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = '2024-01-01';

export async function fetchSanityData<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}`;
  
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }, // ISR: updates every 60 seconds automatically
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.result as T;
  } catch {
    return null;
  }
}
