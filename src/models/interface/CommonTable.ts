export type SortOrder = "asc" | "desc";

export type Column<T> = {
  id: keyof T;
  label: string;
};

export interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading: boolean,
  enableSearch?: boolean;
  enableSort?: boolean;
  enableFilter?: boolean;
  enablePagination?: boolean;
  enableAdd?: boolean;
  enableEdit?: boolean;
  enableDelete?: boolean;
  enableActions?: boolean;
  formComponent?: React.ReactNode;
  filterComponent?: React.ReactNode;
  onCreate?: (values?: T) => Promise<boolean>;
  onEdit?: (values?: T) => Promise<boolean>;
  onDelete?: (row: T) => Promise<void>;
  title: string;
}
  