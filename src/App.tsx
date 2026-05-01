import { useState } from 'react'
import RecipeInput from './components/RecipeInput'
import RecipeDisplay from './components/RecipeDisplay'

interface Recipe {
  ingredients: string[]
  steps: string[]
}

function App() {
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Recipe Parser
        </h1>
        
        <RecipeInput onParsed={setRecipe} />
        
        {recipe && (
          <div className="mt-8">
            <RecipeDisplay 
              ingredients={recipe.ingredients} 
              steps={recipe.steps} 
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App