import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../component/Card';

export const BoardPage = () => {
  const navigate = useNavigate();
  const WritePost = () => {
    navigate('/boardEdit');
  };
  return (
    <div style={{ width: '100%' }}>
      <div>
        <button>Youtuber</button>
        <button>Editor</button>
        <input placeholder="Search" />
        <button onClick={WritePost}>게시글 작성</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
