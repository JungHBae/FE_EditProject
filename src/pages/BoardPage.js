import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../component/Card';
import { useSelector, useDispatch } from 'react-redux';

export const BoardPage = () => {
  const navigate = useNavigate();
  const WritePost = () => {
    navigate('/boardEdit');
  };
  const boards = useSelector((state) => state.board);
  console.log(boards);
  return (
    <div style={{ width: '100%' }}>
      <div>
        <button>Youtuber</button>
        <button>Editor</button>
        <input placeholder="Search" />
        <button onClick={WritePost}>게시글 작성</button>
      </div>
      <div style={{ display: 'flex' }}>
        {boards.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} />
        ))}
      </div>
    </div>
  );
};
