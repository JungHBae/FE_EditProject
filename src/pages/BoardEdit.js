import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import nextId from 'react-id-generator';
import { boardActions } from '../store/Store';

export const BoardEdit = () => {
  // const state = useSelector((state) => state.board);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nextId = useRef(1);
  const [inputValue, setInputValue] = useState({
    id: 1,
    title: '',
    career: 0,
    time: '',
    money: 0,
    worktype: '',
    content: '',
  });

  const { title, career, time, money, worktype, content } = inputValue;

  const change = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setInputValue({ ...inputValue, id: nextId.current });
    console.log(inputValue);
    dispatch(boardActions.add(inputValue));
    setInputValue({
      id: nextId.current,
      title: '',
      career: 0,
      time: '',
      money: 0,
      worktype: '',
      content: '',
    });
    navigate(`/board/${nextId.current}`);
    nextId.current += 1;
  };

  return (
    <div>
      <div>
        <input type="text" name="title" value={title} onChange={change} />
      </div>
      <div style={{ width: '70%', float: 'left' }}>
        <div>
          <form onSubmit={onSubmit}>
            <p>지원자격</p>
            <label htmlFor="career">경력</label>
            <select id="career" name="career" onChange={change} value={career}>
              <option defaultValue>choice</option>
              <option value="1">1~3 year</option>
              <option value="4">4~6 year</option>
              <option value="10">10~15 year</option>
              <option value="16">16~20 year</option>
              <option value="21">21 year up</option>
            </select>
            <p>근무조건</p>
            <div>
              <label htmlFor="pay">급여</label>
              <select id="pay" name="time" value={time} onChange={change}>
                <option defaultValue>choice</option>
                <option value="month">월급</option>
                <option value="si">시급</option>
                <option value="gun">건당</option>
              </select>
              <input
                type="number"
                name="money"
                value={money}
                onChange={change}
              />
            </div>

            <label htmlFor="workType">근무형태</label>
            <select
              id="workType"
              name=" worktype"
              value={worktype}
              onChange={change}
            >
              <option defaultValue>choice</option>
              <option value="offline">오프라인</option>
              <option value="home">재택</option>
            </select>
            <button>완료</button>
          </form>
        </div>
        <div>
          <p>상세내용</p>
          <textarea name="content" value={content} onChange={change} />
        </div>
      </div>
      <div style={{ float: 'right', width: '30%' }}>
        <p>유튜버/편집자 정보</p>
        <img
          src="https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_960_720.png"
          alt="profileImg"
          width="100px"
        />
        <div>
          <span>유튜브명</span>
          <span>김블루</span>
        </div>
        <div>
          <span>링크</span>
          <a href="#">Link</a>
        </div>
      </div>
    </div>
  );
};
