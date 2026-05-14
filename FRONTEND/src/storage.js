import { state } from './state.js';

export function saveToStorage() {
  localStorage.setItem('state', JSON.stringify(state.items));
}

export function loadFromStorage() {
  const json = localStorage.getItem('state');
  if (!json) return [];
  try {
    const data = JSON.parse(json);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}