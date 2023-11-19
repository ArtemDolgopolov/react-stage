import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this line
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store';
import SearchResults from '../components/SearchResults';

// Mock the API call
jest.mock('../redux/api', () => ({
  ...jest.requireActual('../redux/api'),
  useFetchDataQuery: () => ({
    data: [],
    isLoading: true, // Set isLoading to true to simulate loading state
  }),
}));

test('renders SearchResults correctly', async () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SearchResults searchTerm="Luke" />
      </MemoryRouter>
    </Provider>
  );

  // Wait for the loading state to resolve
  await waitFor(() => {
    // Assert that either loading text or "No results found." is present
    expect(getByText(/Loading...|No results found./)).toBeInTheDocument();
  });
});
