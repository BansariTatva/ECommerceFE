import { useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  Toolbar,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { Add, Edit, Delete, FilterList } from "@mui/icons-material";
import type { CommonTableProps, SortOrder } from "../models";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CommonTable = <T extends Record<string, any>>({
  columns,
  data,
  loading,
  enableSearch = true,
  enableSort = true,
  enableFilter = false,
  enablePagination = true,
  enableAdd = true,
  enableActions = true,
  enableEdit = true,
  enableDelete = true,
  formComponent,
  filterComponent,
  onCreate,
  onEdit,
  onDelete,
  title = "Data Table",
}: CommonTableProps<T>) => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<SortOrder>("asc");
  const [orderBy, setOrderBy] = useState<keyof T | "">("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSort = (columnId: keyof T) => {
    if (!enableSort) return;
    const isAsc = orderBy === columnId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
  };

  const handleEdit = (row: T) => {
    setDialogMode("edit");
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCreate = () => {
    setDialogMode("create");
    setSelectedRow(null);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = (row: T) => {
    setSelectedRow(row);
    setDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRow?.id) onDelete?.(selectedRow.id);
    setDeleteConfirm(false);
  };

  const filteredData = useMemo(() => {
    let filtered = [...data];
    if (search && enableSearch) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((v) =>
          v?.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }
    if (orderBy) {
      filtered.sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (aValue < bValue) return order === "asc" ? -1 : 1;
        if (aValue > bValue) return order === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [data, search, order, orderBy]);

  const paginatedData = useMemo(() => {
    if (!enablePagination) return filteredData;
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage, enablePagination]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {/* Toolbar */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h6">{title}</Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {enableSearch && (
            <TextField
              size="small"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}

          {enableFilter && (
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setFilterOpen(true)}
            >
              Filter
            </Button>
          )}

          {enableAdd && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreate}
            >
              Add
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Table */}
      <TableContainer>
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="300px"
            width="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id as string}>
                    {enableSort ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
                {enableActions && <TableCell align="center">Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={index} hover>
                  {columns.map((column) => (
                    <TableCell key={String(column.id)}>
                      {String(row[column.id])}
                    </TableCell>
                  ))}
                  {enableActions && (
                    <TableCell align="center">
                      {enableEdit && (
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(row)}
                        >
                          <Edit />
                        </IconButton>
                      )}
                      {enableDelete && (
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteConfirm(row)}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + (enableActions ? 1 : 0)}>
                    <Typography align="center" color="text.secondary">
                      No records found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Pagination */}
      {enablePagination && filteredData.length > rowsPerPage && (
        <Box display="flex" justifyContent="center" py={2}>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={(_, val) => setPage(val)}
            color="primary"
          />
        </Box>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>
          {dialogMode === "create" ? "Create Item" : "Edit Item"}
        </DialogTitle>
        <DialogContent dividers>{formComponent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (!selectedRow) return;
              if (dialogMode === "create" && enableAdd && onCreate) {
                onCreate(selectedRow);
              } else if (enableEdit && onEdit) {
                onEdit(selectedRow);
              }
              setOpenDialog(false);
            }}
          >
            {dialogMode === "create" ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{ sx: { width: 300, p: 2 } }}
      >
        <Typography variant="h6" mb={2}>
          Filters
        </Typography>
        {filterComponent || (
          <Typography color="text.secondary">
            No filter fields provided.
          </Typography>
        )}
      </Drawer>
    </Paper>
  );
};
