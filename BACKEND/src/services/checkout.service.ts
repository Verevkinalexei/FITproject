import { CheckoutRepository } from "../repositories/checkout.repository";
import { CreateCheckoutDto, UpdateCheckoutDto } from "../types";
import { ApiError } from "../middlewares/error.middleware";
import crypto from "crypto";
export const CheckoutService = {
  getAll: (query: any) => {
    let data = CheckoutRepository.getAll();
    if (query.status) data = data.filter(item => item.status === query.status);
    if (query.sortBy) {
      const field = query.sortBy as keyof typeof data[0];
      const dir = query.sortDir === "desc" ? -1 : 1;
      data.sort((a, b) => ((a[field] || "") > (b[field] || "") ? dir : -dir));
    }
    return data;
  },
  getById: (id: string) => {
    const item = CheckoutRepository.getById(id);
    if (!item) throw new ApiError(404, "NOT_FOUND", `Request ${id} not found`);
    return item;
  },
  create: (dto: CreateCheckoutDto) => {
    const errors = [];
    if (!dto.itemCode) errors.push({ field: "itemCode", message: "Required" });
    if (!dto.userName) errors.push({ field: "userName", message: "Required" });
    if (!dto.dateFrom) errors.push({ field: "dateFrom", message: "Required" });
    if (!dto.dateTo) errors.push({ field: "dateTo", message: "Required" });
    if (!dto.status) errors.push({ field: "status", message: "Required" });
    if (dto.dateFrom && dto.dateTo && new Date(dto.dateFrom) > new Date(dto.dateTo)) {
      errors.push({ field: "dateTo", message: "Cannot be earlier than dateFrom" });
    }
    if (errors.length > 0) throw new ApiError(400, "VALIDATION_ERROR", "Invalid body", errors);
    return CheckoutRepository.add({ id: crypto.randomUUID(), ...dto });
  },
  update: (id: string, dto: UpdateCheckoutDto) => {
    const updated = CheckoutRepository.update(id, dto);
    if (!updated) throw new ApiError(404, "NOT_FOUND", `Request ${id} not found`);
    return updated;
  },
  delete: (id: string) => {
    if (!CheckoutRepository.delete(id)) throw new ApiError(404, "NOT_FOUND", `Request ${id} not found`);
  }
};