import { Box, TextField, MenuItem } from "@mui/material";
import React from "react";
import type { OrderFilters } from "../../models";
import { OrderStatus } from "../../models/enums/OrderStatus";

type Props = {
    filters: OrderFilters;
    setFilters: (filters: OrderFilters) => void;
};

export const OrderFilter: React.FC<Props> = ({ filters, setFilters }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Customer Name"
        value={filters.customerName || ""}
        onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
      />
      <TextField
        select
        label="Status"
        value={filters.status || ""}
        onChange={(e) => setFilters({ ...filters, status: e.target.value as OrderStatus | "" })}
      >
        <MenuItem value="">All</MenuItem>
        {Object.values(OrderStatus).map((status) => (
            <MenuItem key={status} value={status}>
            {status}
            </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
