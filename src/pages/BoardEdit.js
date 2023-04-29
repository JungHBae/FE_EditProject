import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import nextId from 'react-id-generator';
import { boardActions } from '../redux/modules/board';

export const BoardEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState({
    title: '',
    content: '',
    genre: '',
    salary: '',
    career: '',
    deadline: '',
  });
  const [money, setMoney] = useState(0);
  const moneyHandle = (e) => {
    setMoney((prev) => e.target.value);
  };

  const { title, content, genre, salary, career, deadline } = inputValue;

  const change = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const id = Number(nextId().slice(2));
    inputValue.id = id;
    inputValue.salary = `${inputValue.salary} ${money}`;
    setInputValue(inputValue);
    dispatch(boardActions.add(inputValue));
    navigate(`/board/`);
    setInputValue({
      title: '',
      content: '',
      genre: '',
      salary: '',
      career: '',
      deadline: '',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          <label htmlFor="genre">카테고리</label>
          <select id="genre" name="genre" value={genre} onChange={change}>
            <option defaultValue>choice</option>
            <option value="genre1">genre1</option>
            <option value="genre2">genre2</option>
            <option value="genre3">genre3</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            name="deadline"
            value={deadline}
            onChange={change}
          />
        </div>
        <div>
          <input type="text" name="title" value={title} onChange={change} />
        </div>
        <div style={{ width: '70%', float: 'left' }}>
          <div>
            <p>스펙</p>
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
              <label htmlFor="salary">급여</label>
              <select
                id="salary"
                name="salary"
                value={salary}
                onChange={change}
              >
                <option defaultValue>choice</option>
                <option value="month">월급</option>
                <option value="si">시급</option>
                <option value="gun">건당</option>
              </select>
              <input
                type="number"
                name="money"
                value={money}
                onChange={moneyHandle}
              />
            </div>

            <div>
              <p>상세내용</p>
              <textarea name="content" value={content} onChange={change} />
            </div>
            <button type="submit">완료</button>
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
            <p>유튜브명</p>
            <p>김블루</p>
          </div>
          <div>
            <span>링크</span>
            <a href="#">Link</a>
          </div>
        </div>
      </div>
    </form>
  );
};
