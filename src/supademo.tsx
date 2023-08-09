export interface SupademoOEmbed {
  type: "rich";
  title: string;
  width: number;
  height: number;
}

/**
 * Extract the Supademo demo ID from the embed URL.
 */
export function extractSupademoDemoFromURL(
  input: string
): { demoId?: string } | null {
  const regex =
    /https:\/\/app\.supademo\.com\/(?:demo|embed|showcase(?:\/embed)?)\/(\w+)/;
  const match = input.match(regex);

  if (match && match[1]) {
    return { demoId: match[1] };
  } else {
    return null; // Return null if no match is found
  }
}

export async function fetchSupademoOEmbedData(
  demoId: string,
  type: "demo" | "showcase"
): Promise<SupademoOEmbed> {
  const url = new URL(`https://app.supademo.com/api/oembed`);

  if (type === "showcase") {
    url.searchParams.append(
      "url",
      `https://app.supademo.com/showcase/embed/${demoId}`
    );
  } else {
    url.searchParams.append("url", `https://app.supademo.com/embed/${demoId}`);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const result = await response.json<SupademoOEmbed>();

  return result;
}
