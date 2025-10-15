import React, { useEffect, useState } from "react";
import { Table } from "../../components";
import { orderService } from "../../services";
import type { IOrder, OrderFilters } from "../../models";
import { OrderFilter } from "./OrderFilter";

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<OrderFilters>({});

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAll(filters);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  //Demo methods for CRUD
  // const handleCreate = async (values: IOrder) => {
  //   await orderService.create(values);
  //   fetchOrders();
  // };

  // const handleEdit = async (values: IOrder) => {
  //   if (values.id) {
  //     await orderService.update(values.id, values);
  //     fetchOrders();
  //   }
  // };

  // const handleDelete = async (row: IOrder) => {
  //   await orderService.delete(row.id);
  //   fetchOrders();
  // };

  return (
    <Table<IOrder>
      columns={[
        { id: "customerName", label: "Customer" },
        { id: "productName", label: "Product" },
        { id: "quantity", label: "Qty" },
        { id: "price", label: "Price ($)" },
        { id: "status", label: "Status" },
        { id: "date", label: "Date" },
      ]}
      data={orders}
      loading={loading}
      enableSearch
      enableSort
      enablePagination
      enableActions={false}
      enableAdd={false}
      enableDelete={false}
      enableEdit={false}
      enableFilter
      filterComponent={<OrderFilter filters={filters} setFilters={setFilters} />}
      title="Orders"
    />
  );
};
