export interface ShoppingListItem {
  id: string;
  name: string;
  checked: boolean;
  recipeName?: string;
}

export function getShoppingList(): ShoppingListItem[] {
  const stored = localStorage.getItem('shoppingList');
  return stored ? JSON.parse(stored) : [];
}

export function addToShoppingList(ingredients: string[], recipeName: string) {
  const currentList = getShoppingList();
  
  const newItems: ShoppingListItem[] = ingredients.map(ingredient => ({
    id: `${Date.now()}-${Math.random()}`,
    name: ingredient,
    checked: false,
    recipeName,
  }));
  
  const updatedList = [...currentList, ...newItems];
  localStorage.setItem('shoppingList', JSON.stringify(updatedList));
}

export function toggleItem(id: string) {
  const list = getShoppingList();
  const updated = list.map(item =>
    item.id === id ? { ...item, checked: !item.checked } : item
  );
  localStorage.setItem('shoppingList', JSON.stringify(updated));
}

export function removeItem(id: string) {
  const list = getShoppingList();
  const updated = list.filter(item => item.id !== id);
  localStorage.setItem('shoppingList', JSON.stringify(updated));
}

export function clearCompleted() {
  const list = getShoppingList();
  const updated = list.filter(item => !item.checked);
  localStorage.setItem('shoppingList', JSON.stringify(updated));
}
