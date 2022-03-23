import React from 'react';

const TableHeader = ({ headers }: { headers: string[] }) => {
  return (<div className='table-header'>
    {
      headers.map((header, i) => {
        return (<span className='header-field' key={i}>{header}</span>)
      })
    }
  </div>
  )
}

export default TableHeader;