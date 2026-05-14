// Збираємо всі елементи в один об'єкт для зручного доступу з будь-якого файлу
export const DOM = {
  requestForm: document.getElementById("requestForm"),
  formTitle: document.getElementById("formTitle"),
  itemCodeEl: document.getElementById("itemCode"),
  userNameEl: document.getElementById("userName"),
  dateFromEl: document.getElementById("dateFrom"),
  dateToEl: document.getElementById("dateTo"),
  statusEl: document.getElementById("status"),
  commentEl: document.getElementById("comment"),
  submitBtn: document.getElementById("submitBtn"),
  resetBtn: document.getElementById("resetBtn"),
  tableBody: document.getElementById("tableBody"),
  emptyState: document.getElementById("emptyState"),
  searchInput: document.getElementById("searchInput"),
  statusFilter: document.getElementById("statusFilter"),
  sortField: document.getElementById("sortField"),
  sortDirectionBtn: document.getElementById("sortDirection"),
  tableHeader: document.querySelector("thead tr")
};