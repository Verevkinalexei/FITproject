// Зберігаємо та експортуємо глобальний стан додатку
export const state = {
  items: [],              // Масив заявок
  editId: null,           // ID заявки, яка редагується
  sortField: "dateFrom",  // Поле для сортування
  sortDirection: "asc",   // Напрямок сортування
  statusFilter: "",       // Фільтр за статусом
  search: ""              // Рядок пошуку
};