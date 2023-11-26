import Link from 'next/link';
import React from 'react';
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
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (newItemsPerPage: number) => void;
}) => {
  const dispatch = useDispatch();
  const availableItemsPerPage = [10, 20, 30];
  const canGoToNextPage = resultsCount > itemsPerPage;

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = Number(event.target.value);
    onItemsPerPageChange(newItemsPerPage);
    dispatch(setItemsPerPage(newItemsPerPage));
    onPageChange(1);
  };

  return (
    <div className="pagination">
      {page > 1 && (
        <Link href={`?page=${page - 1}`} passHref>
          <a className="prev" onClick={() => onPageChange(page - 1)}>
            Prev
          </a>
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
        <Link href={`?page=${page + 1}`} passHref>
          <a className="next" onClick={() => onPageChange(page + 1)}>
            Next
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
