export const OrderStatus = {
    ORDERED: "ORDERED",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELED: "CANCELED"
  } as const;
  
  export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];
  