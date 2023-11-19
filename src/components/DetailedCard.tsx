import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { SearchResult } from '../interfaces/ISearchResults';
import { setResults } from '../redux/appSlice';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setResults([]));
    };
  }, [dispatch]);

  const closeDetailedCard = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeDetailedCard}
      contentLabel="Detailed Card Modal"
    >
      <div>
        {result?.isLoading && <div>Loading...</div>}
        {!result?.isLoading && (
          <>
            <h2>Details for {result?.name}</h2>
            <p>Name: {result?.name}</p>
            <p>Date of birth: {result?.birth_year}</p>
            <button onClick={closeDetailedCard}>Close</button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default DetailedCard;
