import { DOM } from './dom.js';

export function showError(inputEl, errorId, message) {
  inputEl.classList.add("invalid");
  document.getElementById(errorId).textContent = message;
}

export function clearError(inputEl, errorId) {
  inputEl.classList.remove("invalid");
  document.getElementById(errorId).textContent = "";
}

export function clearErrors() {
  clearError(DOM.itemCodeEl, "itemCodeError");
  clearError(DOM.userNameEl, "userNameError");
  clearError(DOM.dateFromEl, "dateFromError");
  clearError(DOM.dateToEl, "dateToError");
  clearError(DOM.statusEl, "statusError");
  clearError(DOM.commentEl, "commentError");
}

export function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}