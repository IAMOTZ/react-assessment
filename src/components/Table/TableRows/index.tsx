import React from 'react';
import PropTypes from 'prop-types';
import { TableColumn } from '../typings';

const TableRow = ({ columns, row }: { columns: TableColumn[], row: any }) => {
  return <div className='row'>
    {
      columns.map((column, i) => {
        const columnValue = (column.valueGetter && column.valueGetter(row)) || row[column.field];
        return (<span className={`column ${column.field}`} key={i}>{columnValue}</span>)
      })
    }
  </div>
}

// @todo: Improve proptypes by declaring shapes
TableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  row:  PropTypes.object,
}

const TableRows = ({ columns, rows }: { columns: TableColumn[], rows: any[] }) => {
  return (<div className='table-rows'>
    {
      rows.map((row, i) => <TableRow columns={columns} row={row} key={row.id || i}/>)
    }
  </div>
  )
}

// @todo: Improve proptypes by declaring shapes
TableRows.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows:  PropTypes.arrayOf(PropTypes.object),
}

export default TableRows;