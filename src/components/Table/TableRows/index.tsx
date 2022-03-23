import React from 'react';
import { TableColumn } from '../typings';

const TableRow = ({ columns, row }: { columns: TableColumn[], row: any }) => {
  return <div className='table-row'>
    {
      columns.map((column, i) => {
        const columnValue = (column.valueGetter && column.valueGetter(row)) || row[column.field];
        return (<span className='column' key={i}>{columnValue}</span>)
      })
    }
  </div>
}

const TableRows = ({ columns, rows }: { columns: TableColumn[], rows: any[] }) => {
  return (<div className='table-rows'>
    {
      rows.map((row, i) => <TableRow columns={columns} row={row} key={row.id || i}/>)
    }
  </div>
  )
}

export default TableRows;