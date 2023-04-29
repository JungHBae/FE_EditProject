import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ id, title }) => {
  const navigate = useNavigate();
  const intoDetail = () => {
    navigate(`/board/${id}`);
  };
  return (
    <div
      style={{ border: '1px solid black', width: '200px', height: '120px' }}
      onClick={intoDetail}
    >
      <p>{title}</p>
    </div>
  );
};

export default Card;
