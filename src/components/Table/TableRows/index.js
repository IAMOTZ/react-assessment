import React from 'react';

const TableRow = ({ columns, row }) => {
  return <div className='table-row'>
    {
      columns.map((column, i) => {
        const columnValue = (column.valueGetter && column.valueGetter(row)) || row[column.field];
        return (<span className='column' key={i}>{columnValue}</span>)
      })
    }
  </div>
}

const TableRows = ({ columns, rows }) => {
  return (<div className='table-rows'>
    {
      rows.map((row, i) => <TableRow columns={columns} row={row} key={row.id || i}/>)
    }
  </div>
  )
}

export default TableRows;