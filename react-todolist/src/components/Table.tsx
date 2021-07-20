import React from 'react';

import { TodoTable } from 'type.model';

// material table
import MaterialTable from 'material-table';

const Table: React.FC<TodoTable> = ({
  title,
  columns,
  data,
  editable,
  localization,
  options,
}) => {
  return (
    <div>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        editable={editable}
        localization={localization}
        options={options}
      />
    </div>
  );
};

export default Table;
