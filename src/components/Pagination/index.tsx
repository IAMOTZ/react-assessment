import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

interface PaginationProps {
  pageSize: number,
  totalDataCount: number,
  onPageChange: (page: number) => void,
}

const Pagination = ({ pageSize, totalDataCount, onPageChange }: PaginationProps) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange])

  const lastPage = Math.ceil(totalDataCount / pageSize) - 1;

  const start = page * pageSize + 1;
  const end = pageSize * page + pageSize;

  return (
    <div className="pagination">
      <button
        className="prev-btn"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}>Previous
      </button>
      <span>{totalDataCount === 0 ? totalDataCount : start} to {end > totalDataCount ? totalDataCount : end} of {totalDataCount}</span>
      <button
        className="next-btn"
        onClick={() => setPage(page + 1)}
        disabled={page === lastPage}>Next
      </button>
    </div>
  )
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  totalDataCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination;
