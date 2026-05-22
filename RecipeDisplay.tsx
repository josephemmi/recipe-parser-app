import { addToShoppingList } from '../lib/shoppingList';

interface RecipeDisplayProps {
  ingredients: string[];
  steps: string[];
  recipeName?: string;
}

export function RecipeDisplay({ ingredients, steps, recipeName = 'Recipe' }: RecipeDisplayProps) {
  const handleAddToList = () => {
    addToShoppingList(ingredients, recipeName);
    alert('Added to shopping list!');
  };

  return (
    <div className="mt-8 grid md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
        <ul className="space-y-2">
          {ingredients.map((ingredient, i) => (
            <li key={i} className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              {ingredient}
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddToList}
          className="mt-6 px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
        >
          Add to Shopping List
        </button>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4">Steps</h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start">
              <span className="text-purple-600 font-bold mr-3">{i + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}