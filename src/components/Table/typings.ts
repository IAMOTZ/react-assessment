

export interface TableColumn {
  field: string;
  headerName: string;
  valueGetter?: (rowData: any) => JSX.Element | string;
};
