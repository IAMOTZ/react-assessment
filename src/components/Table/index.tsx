import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './TableHeader';
import TableRows from './TableRows';
import { TableColumn } from './typings';

export interface TableProps {
  columns: TableColumn[],
  rows: any[],
}

// @todo: Make this generic so it can be aware of the strucutre of the rows data instead of using any
const Table = ({ columns, rows }: TableProps) => {
  const headers = columns.map(column => column.headerName);

  return (
    <div className='table'>
      <TableHeader headers={headers} />
      <TableRows columns={columns} rows={rows} />
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows:  PropTypes.arrayOf(PropTypes.object),
}

export default Table;
