import { UserRepository } from "../repositories/user.repository";
import { CreateUserDto, UpdateUserDto } from "../types";
import { ApiError } from "../middlewares/error.middleware";
import crypto from "crypto";
export const UserService = {
  getAll: () => UserRepository.getAll(),
  getById: (id: string) => {
    const user = UserRepository.getById(id);
    if (!user) throw new ApiError(404, "NOT_FOUND", `User ${id} not found`);
    return user;
  },
  create: (dto: CreateUserDto) => {
    if (!dto.name || !dto.email) throw new ApiError(400, "VALIDATION_ERROR", "Name and email required");
    return UserRepository.add({ id: crypto.randomUUID(), ...dto });
  },
  update: (id: string, dto: UpdateUserDto) => {
    const updated = UserRepository.update(id, dto);
    if (!updated) throw new ApiError(404, "NOT_FOUND", `User ${id} not found`);
    return updated;
  },
  delete: (id: string) => {
    if (!UserRepository.delete(id)) throw new ApiError(404, "NOT_FOUND", `User ${id} not found`);
  }
};