export interface SupademoOEmbed {
  type: "rich";
  title: string;
  width: number;
  height: number;
}

/**
 * Fetch the Supademo oembed data.
 */
export async function fetchSupademoOEmbedData(
  demoId: string
): Promise<SupademoOEmbed> {
  const url = new URL(`https://app.supademo.com/api/oembed`);
  url.searchParams.append("url", `https://app.supademo.com/embed/${demoId}`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const result = await response.json<SupademoOEmbed>();

  return result;
}

/**
 * Extract the Supademo demo ID from the embed URL.
 */
export function extractSupademoDemoFromURL(input: string): {
  demoId?: string;
} {
  const url = new URL(input);
  if (!["app.supademo.com"].includes(url.hostname)) {
    return;
  }

  const parts = url.pathname.split("/");
  if (!["demo"].includes(parts[1])) {
    return;
  }

  return { demoId: parts[2] };
}
