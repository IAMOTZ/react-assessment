import React from 'react';
import PropTypes from 'prop-types';

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

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
}

export default TableHeader;
