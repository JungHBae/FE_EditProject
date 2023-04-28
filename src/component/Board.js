import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Board = () => {
  const params = useParams();
  const board = useSelector((state) => state.board).find(
    (state) => state.id === Number(params.id)
  );
  console.log(board);

  return (
    <div style={{ border: '1px solid black', width: '200px', height: '120px' }}>
      <p>Youtuber</p>
      <p>편집자 구합니다</p>
    </div>
  );
};
