import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({
  page,
  resultsCount,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: {
  page: number;
  resultsCount: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
}) => {
  const canGoToNextPage = resultsCount >= itemsPerPage;

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onItemsPerPageChange(Number(event.target.value));
  };

  return (
    <div className="pagination">
      {page > 1 && (
        <Link
          to={`?page=${page - 1}`}
          className="prev"
          onClick={() => onPageChange(page - 1)}
        >
          Prev
        </Link>
      )}
      <span className="current-page">{page}</span>
      <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
      </select>
      {canGoToNextPage && (
        <Link
          to={`?page=${page + 1}`}
          className="next"
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
