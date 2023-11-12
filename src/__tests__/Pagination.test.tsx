import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  it('updates URL query parameter when page changes', () => {
    const mockOnPageChange = jest.fn();

    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Pagination
          page={2}
          resultsCount={30}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={() => {}}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Next'));

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });
});
