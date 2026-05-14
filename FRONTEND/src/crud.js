import { state } from './state.js';

export function addItem(dto) {
  const item = {
    id: Date.now(),
    ...dto
  };
  state.items.push(item);
}

export function updateItem(id, dto) {
  const found = state.items.find(x => x.id === id);
  if (!found) return;
  Object.assign(found, dto);
}

export function deleteItem(id) {
  state.items = state.items.filter(x => x.id !== id);
}

export function getViewItems() {
  const search = state.search.trim().toLowerCase();
  let data = state.items.slice();

  if (search !== "") {
    data = data.filter(x =>
      x.itemCode.toLowerCase().includes(search) ||
      x.userName.toLowerCase().includes(search)
    );
  }

  if (state.statusFilter !== "") {
    data = data.filter(x => x.status === state.statusFilter);
  }

  data.sort((a, b) => {
    const field = state.sortField;
    let va = a[field];
    let vb = b[field];

    if (va < vb) return state.sortDirection === "asc" ? -1 : 1;
    if (va > vb) return state.sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return data;
}