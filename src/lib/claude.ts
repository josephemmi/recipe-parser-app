export type ParsedRecipe = {
  ingredients: string[];
  steps: string[];
};

const ANTHROPIC_MESSAGES_URL = "/api/anthropic/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
const SYSTEM_PROMPT =
  "Extract ingredients and steps. Return JSON: {ingredients: string[], steps: string[]}";

function textToRecipeJson(text: string): ParsedRecipe {
  let raw = text.trim();
  const fence = raw.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```$/);
  if (fence) raw = fence[1].trim();

  const parsed = JSON.parse(raw) as unknown;
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !Array.isArray((parsed as ParsedRecipe).ingredients) ||
    !Array.isArray((parsed as ParsedRecipe).steps)
  ) {
    throw new Error("Expected JSON with ingredients and steps arrays");
  }
  return parsed as ParsedRecipe;
}

export async function parseRecipe(recipeText: string): Promise<ParsedRecipe> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  console.log("API Key loaded:", apiKey ? "YES" : "NO");
  if (!apiKey) {
    throw new Error("VITE_ANTHROPIC_API_KEY is not set");
  }

  const res = await fetch(ANTHROPIC_MESSAGES_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: recipeText }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Claude API ${res.status}: ${detail}`);
  }

  const data = (await res.json()) as {
    content: Array<{ type: string; text?: string }>;
  };
  const block = data.content.find((c) => c.type === "text");
  if (!block?.text) {
    throw new Error("Claude response had no text block");
  }

  return textToRecipeJson(block.text);
}
