import React, { useEffect, useState } from 'react';

const Pagination = ({ pageSize, totalDataCount, onPageChange }) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    onPageChange(page);
  }, [page, onPageChange])

  const lastPage = Math.ceil(totalDataCount / pageSize) - 1;

  const start = page * pageSize + 1;
  const end = pageSize * page + pageSize;

  return (
    <div className="pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
      <span>{totalDataCount === 0 ? totalDataCount : start} to {end > totalDataCount ? totalDataCount : end} of {totalDataCount}</span>
      <button onClick={() => setPage(page + 1)} disabled={page === lastPage}>Next</button>
    </div>
  )
}

export default Pagination;
