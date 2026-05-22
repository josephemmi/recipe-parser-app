import { useState } from 'react';
import RecipeInput from './components/RecipeInput';
import { ShoppingList } from './components/ShoppingList';

type View = 'parser' | 'list';

function App() {
  const [view, setView] = useState<View>('parser');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-4">
            <button
              onClick={() => setView('parser')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'parser'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Recipe Parser
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                view === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Shopping List
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        {view === 'parser' ? <RecipeInput /> : <ShoppingList />}
      </main>
    </div>
  );
}

export default App;