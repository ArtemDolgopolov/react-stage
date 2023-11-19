import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store';
import Pagination from '../components/Pagination';

test('calls onPageChange when Prev or Next is clicked', () => {
  const onPageChangeMock = jest.fn();

  // Render the Pagination component within a MemoryRouter
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Pagination
          page={2}
          resultsCount={100}
          itemsPerPage={10}
          onPageChange={onPageChangeMock}
          onItemsPerPageChange={() => {}}
        />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(getByText('Prev'));
  fireEvent.click(getByText('Next'));

  expect(onPageChangeMock).toHaveBeenCalledTimes(2);
});

test('calls onItemsPerPageChange when items per page is changed', () => {
  const onItemsPerPageChangeMock = jest.fn();

  // Render the Pagination component within a MemoryRouter
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Pagination
          page={1}
          resultsCount={100}
          itemsPerPage={10}
          onItemsPerPageChange={onItemsPerPageChangeMock}
          onPageChange={() => {}}
        />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(getByText('10').closest('select') as HTMLSelectElement, {
    target: { value: '20' },
  });

  expect(onItemsPerPageChangeMock).toHaveBeenCalledWith(20);
});
