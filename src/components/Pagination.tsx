import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItemsPerPage } from '../redux/searchSlice';

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
  onPageChange: (newPage: number, newItemsPerPage: number) => void;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
}) => {
  const dispatch = useDispatch();
  const availableItemsPerPage = [10, 20, 30];
  const canGoToNextPage = resultsCount >= itemsPerPage;

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(event.target.value);
    onItemsPerPageChange(newItemsPerPage);
    dispatch(setItemsPerPage(newItemsPerPage));
  };

  return (
    <div className="pagination">
      {page > 1 && (
        <Link
          to={`?page=${page - 1}&itemsPerPage=${itemsPerPage}`}
          className="prev"
          onClick={() => onPageChange(page - 1, itemsPerPage)}
        >
          Prev
        </Link>
      )}
      <span className="current-page">{page}</span>
      <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
        {availableItemsPerPage.map((perPage) => (
          <option key={perPage} value={perPage}>
            {perPage}
          </option>
        ))}
      </select>
      {canGoToNextPage && (
        <Link
          to={`?page=${page + 1}&itemsPerPage=${itemsPerPage}`}
          className="next"
          onClick={() => onPageChange(page + 1, itemsPerPage)}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
