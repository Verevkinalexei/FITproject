import { User } from "../types";
let users: User[] = [{ id: "1", name: "Ivan Ivanov", email: "ivan@example.com" }];
export const UserRepository = {
  getAll: () => users,
  getById: (id: string) => users.find(u => u.id === id),
  add: (user: User) => { users.push(user); return user; },
  update: (id: string, data: Partial<User>) => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    return users[index];
  },
  delete: (id: string) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) { users.splice(index, 1); return true; }
    return false;
  }
};