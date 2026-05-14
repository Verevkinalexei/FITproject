import { CheckoutRequest } from "../types";
let requests: CheckoutRequest[] = [];
export const CheckoutRepository = {
  getAll: () => requests,
  getById: (id: string) => requests.find(r => r.id === id),
  add: (item: CheckoutRequest) => { requests.push(item); return item; },
  update: (id: string, data: Partial<CheckoutRequest>) => {
    const index = requests.findIndex(r => r.id === id);
    if (index === -1) return null;
    requests[index] = { ...requests[index], ...data };
    return requests[index];
  },
  delete: (id: string) => {
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) { requests.splice(index, 1); return true; }
    return false;
  }
};