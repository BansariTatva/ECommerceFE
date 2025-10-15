// import type { IOrder } from "../models";
// import api from "./axiosInstance";
// import BaseService from "./baseService";

// class OrderService extends BaseService<IOrder> {
//   constructor() {
//     super("orders");
//   }

//   async getByCustomer(customerId: string) {
//     return api.get(`/customer/${customerId}`);
//   }
// }

// export const orderService = new OrderService();

//Demo dataset
import type { IOrder, OrderFilters } from "../models";
import { OrderStatus } from "../models/enums/OrderStatus";

const demoOrders: IOrder[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  customerName: `Customer ${i + 1}`,
  productName: `Product ${((i % 5) + 1)}`,
  quantity: Math.floor(Math.random() * 10) + 1,
  price: Number((Math.random() * 100).toFixed(2)),
  status: Object.values(OrderStatus)[i % 3],
  date: new Date(2025, 9, i + 1).toISOString().split("T")[0],
}));

export const orderService = {
  getAll: async (filters?: OrderFilters) => {
    let data = demoOrders;
    if (filters?.customerName) {
        const name = filters.customerName.toLowerCase();
        data = data.filter((o) => o.customerName.toLowerCase().includes(name));
    }
    if (filters?.status) {
      data = data.filter((o) => o.status === filters.status);
    }
    return Promise.resolve(data);
  },
//   create: async (order: IOrder) => Promise.resolve(demoOrders.push({ ...order, id: demoOrders.length + 1 })),
//   update: async (id: number, order: Partial<IOrder>) => Promise.resolve(demoOrders.find(order => order.id === id)),
//   delete: async (id: number) => Promise.resolve(),
};
