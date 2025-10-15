import type { OrderStatus } from "../enums/OrderStatus";

export interface IOrder {
    id: number;
    customerName: string;
    productName: string;
    quantity: number;
    price: number;
    status: OrderStatus;
    date: string;
}

export interface OrderFilters {
    customerName?: string;
    status?: OrderStatus | "";
  }
