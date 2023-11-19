import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Search from '../components/Search';

test('renders Search correctly', async () => {
  render(
    <Provider store={store}>
      <Search onSearch={() => {}} />
    </Provider>
  );

  const input = screen.getByPlaceholderText('Search...');

  fireEvent.change(input, { target: { value: 'Luke' } });

  await waitFor(() => {
    expect(input).toHaveValue('Luke');
  });
});

test('handles local storage correctly', async () => {
  render(
    <Provider store={store}>
      <Search onSearch={() => {}} />
    </Provider>
  );

  const input = screen.getByPlaceholderText('Search...');

  fireEvent.change(input, { target: { value: 'Anakin' } });

  await waitFor(() => {
    expect(input).toHaveValue('Anakin');
  });

  const searchButton = screen.getByText('Search persons');

  fireEvent.click(searchButton);

  expect(localStorage.getItem('searchTerm')).toBe('Anakin');
});
