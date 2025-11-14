export type ApodItem = {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version?: string;
  title: string;
  url: string;
};

export async function getData(count = 6): Promise<ApodItem[]> {
  const key = process.env.NASA_API_KEY;
  if (!key) throw new Error('NASA_API_KEY is not defined in env.');

  const url = `https://api.nasa.gov/planetary/apod?count=${encodeURIComponent(String(count))}&api_key=${encodeURIComponent(key)}`;

  const res = await fetch(url, {
    // server-side fetch (app router). No cache or specify revalidate if you want ISR:
    next: { revalidate: 60 * 60 } // optional: revalidate every hour
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`NASA API request failed: ${res.status} ${res.statusText} ${text}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Unexpected NASA API response format.');

  return data as ApodItem[];
}
