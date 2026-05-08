import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { recipeText } = req.body;

  if (!recipeText) {
    return res.status(400).json({ error: 'Recipe text is required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.VITE_ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `Extract ingredients and steps from this recipe text. Return ONLY valid JSON with this structure: {ingredients: string[], steps: string[]}. No markdown, no explanation, just the JSON.\n\nRecipe: ${recipeText}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const content = data.content[0].text;
    const parsed = JSON.parse(content);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to parse recipe' });
  }
}