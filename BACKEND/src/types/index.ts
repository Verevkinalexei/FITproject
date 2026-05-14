export interface User {
  id: string;
  name: string;
  email: string;
}
export interface CheckoutRequest {
  id: string;
  itemCode: string;
  userName: string;
  dateFrom: string;
  dateTo: string;
  status: "New" | "Approved" | "Returned" | "Rejected";
  comment?: string;
}
export type CreateUserDto = Omit<User, "id">;
export type UpdateUserDto = Partial<CreateUserDto>;
export type CreateCheckoutDto = Omit<CheckoutRequest, "id">;
export type UpdateCheckoutDto = Partial<CreateCheckoutDto>;