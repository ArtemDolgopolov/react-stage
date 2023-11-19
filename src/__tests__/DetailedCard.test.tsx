import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import DetailedCard from '../components/DetailedCard';
import Modal from 'react-modal';

beforeAll(() => {
  Modal.setAppElement(document.createElement('div'));
});

describe('DetailedCard', () => {
  test('renders detailed card when isOpen is true and result is not null', () => {
    const mockResult = {
      name: 'Anakin Skywalker',
      birth_year: '41 BBY',
      isLoading: false,
    };

    render(
      <Provider store={store}>
        <DetailedCard isOpen={true} onClose={() => {}} result={mockResult} />
      </Provider>
    );

    expect(
      screen.getByText(`Details for ${mockResult.name}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Name: ${mockResult.name}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Date of birth: ${mockResult.birth_year}`)
    ).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
