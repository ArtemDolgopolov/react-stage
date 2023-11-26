import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import { SearchResult } from '../interfaces/ISearchResults';
import { setResults } from '../redux/appSlice';

interface DetailedCardProps {
  isOpen: boolean;
  onClose: () => void;
  result: SearchResult | null;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ isOpen, onClose, result }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setResults([]));
    };
  }, [dispatch]);

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Detailed Card Modal"
      shouldCloseOnOverlayClick={true}
    >
      <div>
        {result && (
          <>
            <h2>Details for {result.name}</h2>
            <p>Name: {result.name}</p>
            <p>Date of birth: {result.birth_year}</p>
            <button onClick={closeModal}>Close</button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DetailedCard;
