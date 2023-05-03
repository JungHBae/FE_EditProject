import React, { useState } from 'react';
import CheckTokenExpiration from '../component/CheckTokenExpiration';
import auth from '../api/auth';

const MATCH_URL = '/matching';
export const Matching = () => {
  const [matchingList, setMatchingList] = useState([]);
  const [showMatch, setShowMatch] = useState(false);

  const goMatch = async () => {
    if (CheckTokenExpiration()) {
      const response = await auth.post(MATCH_URL);
      setMatchingList(response.data);
      setShowMatch((prev) => !prev);
    } else {
      alert('로그인 상태에서만 매치상대를 찾을수있습니다');
      setShowMatch(false);
    }
  };

  return (
    <div>
      <button onClick={goMatch}>matching go</button>
      {showMatch && matchingList.map((item) => <li>item</li>)}
      <div></div>
    </div>
  );
};
