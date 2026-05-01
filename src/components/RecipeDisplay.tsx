type RecipeDisplayProps = {
  ingredients: string[];
  steps: string[];
};

function RecipeDisplay({ ingredients, steps }: RecipeDisplayProps) {
  function handleAddToShoppingList() {
    console.log("Add to Shopping List", ingredients);
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 text-left">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Ingredients
          </h2>
          <ul className="ml-5 list-disc space-y-2 text-gray-700 marker:text-violet-600 dark:text-gray-300 dark:marker:text-violet-400">
            {ingredients.map((item, i) => (
              <li key={`${i}-${item.slice(0, 24)}`}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Steps</h2>
          <ol className="ml-5 list-decimal space-y-3 text-gray-700 marker:font-medium marker:text-violet-600 dark:text-gray-300 dark:marker:text-violet-400">
            {steps.map((step, i) => (
              <li key={`${i}-${step.slice(0, 24)}`}>{step}</li>
            ))}
          </ol>
        </section>
      </div>

      <button
        type="button"
        onClick={handleAddToShoppingList}
        className="w-full rounded-lg border border-violet-600 bg-transparent px-4 py-2.5 text-sm font-medium text-violet-700 hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:border-violet-500 dark:text-violet-300 dark:hover:bg-violet-950/40 dark:focus:ring-offset-gray-900 md:w-auto md:self-start"
      >
        Add to Shopping List
      </button>
    </div>
  );
}
export default RecipeDisplay