export function createInventory() {
  return {
    items: [],
  };
}

export function addItem(inventory, item) {
  const existing = inventory.items.find(i => i.id === item.id);

  if (existing) {
    existing.qty += item.qty || 1;
  } else {
    inventory.items.push({ ...item, qty: item.qty || 1 });
  }
}
