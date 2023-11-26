const Card: React.FC<{ name: string; birthYear: string }> = ({ name, birthYear }) => {
  return (
    <div className="result">
      <p>Name: {name}</p>
      <p>Date of birth: {birthYear}</p>
    </div>
  );
};

export default Card;
