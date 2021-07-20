export interface Login {
  token: string;
}

export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  message: string;
}

export interface TableColumns {
  title: string;
  field: string;
  validate?: (rowData: any) => string;
}

export interface TableTask {
  id: number;
  name: string;
  when: Date;
  tableData?: {
    id: number;
    editing?: string | undefined;
  };
}

export interface TodoTable {
  title: string;
  columns: TableColumns[];
  data: TableTask[];
  editable?: object;
  localization?: object;
  options?: object;
}
