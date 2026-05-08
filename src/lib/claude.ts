export async function parseRecipe(recipeText: string) {
  try {
    const response = await fetch('/api/parse-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeText }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to parse recipe:', error);
    throw error;
  }
}