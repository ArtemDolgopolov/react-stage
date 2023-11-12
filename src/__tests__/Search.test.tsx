import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../components/Search';
import { AppStateProvider } from '../components/AppStateContext';

it('renders search input and button', () => {
  render(
    <AppStateProvider>
      <Search onSearch={() => {}} />
    </AppStateProvider>
  );

  const inputElement = screen.getByPlaceholderText('Search...');
  const buttonElement = screen.getByText('Search persons');

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

it('clicking the Search button saves the entered value to the local storage', () => {
  const mockOnSearch = jest.fn();
  render(
    <AppStateProvider>
      <Search onSearch={mockOnSearch} />
    </AppStateProvider>
  );

  const inputElement = screen.getByPlaceholderText('Search...');
  const buttonElement = screen.getByText('Search persons');

  fireEvent.change(inputElement, { target: { value: 'Luke Skywalker' } });

  fireEvent.click(buttonElement);

  expect(mockOnSearch).toHaveBeenCalledWith('Luke Skywalker');
});

test('component retrieves the value from the local storage upon mounting', () => {
  const mockOnSearch = jest.fn();
  render(
    <AppStateProvider>
      <Search onSearch={mockOnSearch} />
    </AppStateProvider>
  );

  const buttonElement = screen.getByText('Search persons');

  fireEvent.click(buttonElement);

  expect(mockOnSearch).not.toHaveBeenCalled();
});
