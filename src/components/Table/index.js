import React from 'react';
import TableHeader from './TableHeader';
import TableRows from './TableRows';

const Table = ({ columns, rows }) => {
  const headers = columns.map(column => column.headerName);

  return (
    <div className='table'>
      <TableHeader headers={headers} />
      <TableRows columns={columns} rows={rows} />
    </div>
  )
}

export default Table;
