import { render, screen, fireEvent } from '@testing-library/react';
import DetailedCard from '../components/DetailedCard';
import '@testing-library/jest-dom';
import Modal from 'react-modal';

Modal.setAppElement(document.createElement('div'));

const mockResult = {
  name: 'Test Name',
  birth_year: '2000',
  isLoading: false,
};

describe('DetailedCard Component', () => {
  it('correctly displays the detailed card data', () => {
    render(
      <DetailedCard isOpen={true} onClose={() => {}} result={mockResult} />
    );

    expect(
      screen.getByText(`Details for ${mockResult.name}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Name: ${mockResult.name}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Date of birth: ${mockResult.birth_year}`)
    ).toBeInTheDocument();
  });

  it('indicator is displayed while fetching data', () => {
    render(
      <DetailedCard isOpen={false} onClose={() => {}} result={mockResult} />
    );

    expect(
      screen.queryByText(`Details for ${mockResult.name}`)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(`Name: ${mockResult.name}`)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(`Date of birth: ${mockResult.birth_year}`)
    ).not.toBeInTheDocument();
  });

  it('close button hides the component', () => {
    const onCloseMock = jest.fn();
    render(
      <DetailedCard isOpen={true} onClose={onCloseMock} result={mockResult} />
    );

    fireEvent.click(screen.getByText('Close'));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
