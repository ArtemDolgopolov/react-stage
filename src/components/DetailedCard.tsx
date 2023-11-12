import React from 'react';
import Modal from 'react-modal';
import { SearchResult } from '../interfaces/ISearchResults';

interface DetailedCardProps {
  isOpen: boolean;
  onClose: () => void;
  result: SearchResult | null;
}

const DetailedCard: React.FC<DetailedCardProps> = ({
  isOpen,
  onClose,
  result,
}) => {
  if (!result) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detailed Card Modal"
    >
      <div>
        {result.isLoading && <div>Loading...</div>}
        {!result.isLoading && (
          <>
            <h2>Details for {result.name}</h2>
            <p>Name: {result.name}</p>
            <p>Date of birth: {result.birth_year}</p>
            <button onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DetailedCard;
