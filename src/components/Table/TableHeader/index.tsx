import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ headers }: { headers: string[] }) => {
  return (<div className='row row-header'>
    {
      headers.map((header, i) => {
        return (<span className='column column-header' key={i}>{header}</span>)
      })
    }
  </div>
  )
}

TableHeader.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
}

export default TableHeader;
