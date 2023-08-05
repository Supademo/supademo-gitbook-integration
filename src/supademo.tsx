export interface SupademoOEmbed {
  type: "rich";
  title: string;
  width: number;
  height: number;
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
  if (parts[1] === "demo" || parts[1] === "showcase") {
    return { demoId: parts[2] };
  }

  return;
}