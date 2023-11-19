import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import NotFoundPage from '../components/404Page';

it('renders 404 page', () => {
  const { getByText } = render(<NotFoundPage />);
  const notFoundText = getByText(/404/i);
  expect(notFoundText).toBeInTheDocument();
});
