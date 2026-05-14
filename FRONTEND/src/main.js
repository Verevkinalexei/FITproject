import { state } from './state.js';
import { DOM } from './dom.js';
import { saveToStorage, loadFromStorage } from './storage.js';
import { clearErrors, escapeHtml } from './utils.js';
import { validate } from './validation.js';
import { addItem, updateItem, deleteItem, getViewItems } from './crud.js';

// --- Функції інтерфейсу ---

function readForm() {
  return {
    itemCode: DOM.itemCodeEl.value.trim(),
    userName: DOM.userNameEl.value.trim(),
    dateFrom: DOM.dateFromEl.value,
    dateTo: DOM.dateToEl.value,
    status: DOM.statusEl.value,
    comment: DOM.commentEl.value.trim()
  };
}

function startEdit(id) {
  const item = state.items.find(x => x.id === id);
  if (!item) return;

  DOM.itemCodeEl.value = item.itemCode;
  DOM.userNameEl.value = item.userName;
  DOM.dateFromEl.value = item.dateFrom;
  DOM.dateToEl.value = item.dateTo;
  DOM.statusEl.value = item.status;
  DOM.commentEl.value = item.comment ?? "";

  state.editId = id;
  DOM.submitBtn.textContent = "Зберегти";
  DOM.formTitle.textContent = "Редагувати заявку";
}

function resetForm() {
  DOM.requestForm.reset();
  clearErrors();
  state.editId = null;
  DOM.submitBtn.textContent = "Додати";
  DOM.formTitle.textContent = "Додати заявку";
  DOM.itemCodeEl.focus();
}

function render() {
  const data = getViewItems();
  DOM.emptyState.style.display = state.items.length === 0 ? "block" : "none";

  DOM.tableBody.innerHTML = data.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(item.itemCode)}</td>
      <td>${escapeHtml(item.userName)}</td>
      <td>${item.dateFrom}</td>
      <td>${item.dateTo}</td>
      <td>${escapeHtml(item.status)}</td>
      <td>
        <div class="row-actions">
          <button type="button" class="edit-btn" data-id="${item.id}">Редагувати</button>
          <button type="button" class="delete-btn" data-id="${item.id}">Видалити</button>
        </div>
      </td>
    </tr>
  `).join("");
}

// --- Обробники подій ---

DOM.requestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const dto = readForm();
  
  if (!validate(dto)) return;

  if (state.editId === null) {
    addItem(dto);
  } else {
    updateItem(state.editId, dto);
  }

  saveToStorage();
  render();
  resetForm();
});

DOM.resetBtn.addEventListener("click", resetForm);

DOM.searchInput.addEventListener("input", () => {
  state.search = DOM.searchInput.value;
  render();
});

DOM.statusFilter.addEventListener("change", () => {
  state.statusFilter = DOM.statusFilter.value;
  render();
});

DOM.sortField.addEventListener("change", () => {
  state.sortField = DOM.sortField.value;
  render();
});

DOM.sortDirectionBtn.addEventListener("click", () => {
  state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  DOM.sortDirectionBtn.textContent = state.sortDirection === "asc" ? "↑ ASC" : "↓ DESC";
  render();
});

DOM.tableBody.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  const idStr = target.dataset.id;
  if (!idStr) return;

  const id = Number(idStr);

  if (target.classList.contains("delete-btn")) {
    deleteItem(id);
    saveToStorage();
    render();
    if (state.editId === id) resetForm();
    return;
  }

  if (target.classList.contains("edit-btn")) {
    startEdit(id);
    return;
  }
});

DOM.tableHeader.addEventListener("click", (e) => {
  const th = e.target.closest('.sortable');
  if (!th) return;

  const field = th.dataset.field;

  if (state.sortField === field) {
    state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
  } else {
    state.sortField = field;
    state.sortDirection = "asc";
  }
  render();
});

// --- Ініціалізація додатку ---

state.items = loadFromStorage();
DOM.sortField.value = state.sortField;
DOM.sortDirectionBtn.textContent = state.sortDirection === "asc" ? "↑ ASC" : "↓ DESC";
render();
resetForm();