import { useState, useEffect } from 'react';
import { getShoppingList, toggleItem, removeItem, clearCompleted, ShoppingListItem } from '../lib/shoppingList';

export function ShoppingList() {
  const [items, setItems] = useState<ShoppingListItem[]>([]);

  const loadItems = () => {
    setItems(getShoppingList());
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleToggle = (id: string) => {
    toggleItem(id);
    loadItems();
  };

  const handleRemove = (id: string) => {
    removeItem(id);
    loadItems();
  };

  const handleClearCompleted = () => {
    clearCompleted();
    loadItems();
  };

  const uncheckedCount = items.filter(item => !item.checked).length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping List</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-500">No items yet. Parse a recipe and add ingredients!</p>
      ) : (
        <>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">{uncheckedCount} items remaining</p>
            <button
              onClick={handleClearCompleted}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear Completed
            </button>
          </div>
          
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggle(item.id)}
                  className="w-5 h-5"
                />
                <span className={item.checked ? 'line-through text-gray-400 flex-1' : 'flex-1'}>
                  {item.name}
                </span>
                {item.recipeName && (
                  <span className="text-xs text-gray-400">{item.recipeName}</span>
                )}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
