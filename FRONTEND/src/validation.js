import { DOM } from './dom.js';
import { showError, clearErrors } from './utils.js';

export function validate(dto) {
  clearErrors();
  let ok = true;

  if (dto.itemCode === "") {
    showError(DOM.itemCodeEl, "itemCodeError", "Вкажіть код/номер обладнання.");
    ok = false;
  } else if (dto.itemCode.length < 2 || dto.itemCode.length > 30) {
    showError(DOM.itemCodeEl, "itemCodeError", "Довжина має бути 2–30 символів.");
    ok = false;
  }

  if (dto.userName === "") {
    showError(DOM.userNameEl, "userNameError", "Вкажіть ПІБ користувача.");
    ok = false;
  } else if (dto.userName.length < 3 || dto.userName.length > 40) {
    showError(DOM.userNameEl, "userNameError", "Довжина має бути 3–40 символів.");
    ok = false;
  }

  if (dto.dateFrom === "") {
    showError(DOM.dateFromEl, "dateFromError", "Оберіть дату початку.");
    ok = false;
  }

  if (dto.dateTo === "") {
    showError(DOM.dateToEl, "dateToError", "Оберіть дату завершення.");
    ok = false;
  }

  if (dto.dateFrom !== "" && dto.dateTo !== "" && dto.dateFrom > dto.dateTo) {
    showError(DOM.dateToEl, "dateToError", "Дата 'по' не може бути раніше дати 'з'.");
    ok = false;
  }

  if (!dto.status) {
    showError(DOM.statusEl, "statusError", "Оберіть статус.");
    ok = false;
  }

  if (dto.comment !== "" && dto.comment.length < 5) {
    showError(DOM.commentEl, "commentError", "Якщо вводите коментар — мінімум 5 символів.");
    ok = false;
  }

  return ok;
}