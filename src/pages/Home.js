import React from 'react';

import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="selection">
      <Link to="matching">
        <div
          style={{ width: '200px', height: '100px', border: '1px solid black' }}
        >
          매칭받기
        </div>
      </Link>
    </div>
  );
};
