import { useState } from "react";
import { parseRecipe, type ParsedRecipe } from "../lib/claude";

type RecipeInputProps = {
  onParsed: (recipe: ParsedRecipe) => void;
};

function RecipeInput({ onParsed }: RecipeInputProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleParse() {
    setError(null);
    setLoading(true);
    try {
      const recipe = await parseRecipe(text);
      onParsed(recipe);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 text-left">
      <label htmlFor="recipe-text" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Recipe text
      </label>
      <textarea
        id="recipe-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        placeholder="Paste your recipe here…"
        disabled={loading}
        className="min-h-[200px] w-full resize-y rounded-lg border border-gray-300 bg-white p-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleParse}
          disabled={loading || !text.trim()}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-gray-900"
        >
          Parse Recipe
        </button>
        {loading ? (
          <span className="text-sm text-gray-500 dark:text-gray-400">Loading...</span>
        ) : null}
      </div>
      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
export default RecipeInput
