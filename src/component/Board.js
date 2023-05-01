import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { boardActions } from '../redux/modules/board';
import styles from './Board.module.css';

export const Board = () => {
  const [isUpdate, setIsUpdated] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const board = useSelector((state) => state.board).find(
    (item) => item.id === Number(params.id)
  );

  const [inputValue, setInputValue] = useState({
    ...board,
  });
  const { title, career, genre, salary, deadline, content } = inputValue;
  const paytype = salary.split(' ')[0];
  const paymoney = salary.split(' ')[1];
  const [money, setMoney] = useState(paymoney);
  const moneyHandle = (e) => {
    setMoney(() => e.target.value);
  };
  const change = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const updateHandler = () => {
    setIsUpdated((prev) => !prev);
  };
  const updateBoard = () => {
    inputValue.salary = `${inputValue.salary} ${money}`;
    setInputValue(inputValue);
    dispatch(boardActions.update(inputValue));
    setIsUpdated((prev) => !prev);
  };
  const deleteBoard = () => {
    dispatch(boardActions.delete(Number(params.id)));
    navigate(`/board/`);
  };
  return (
    <div>
      <div>
        <label htmlFor="genre">카테고리</label>
        <select
          id="genre"
          name="genre"
          value={genre}
          onChange={change}
          disabled={isUpdate}
        >
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
          disabled={isUpdate}
        />
      </div>
      <div>
        <input
          type="text"
          name="title"
          value={title}
          onChange={change}
          disabled={isUpdate}
        />
      </div>
      <div style={{ width: '70%', float: 'left' }}>
        <div>
          <p>스펙</p>
          <label htmlFor="career">경력</label>
          <select
            id="career"
            name="career"
            onChange={change}
            value={career}
            disabled={isUpdate}
          >
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
              value={paytype}
              onChange={change}
              disabled={isUpdate}
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
              disabled={isUpdate}
            />
          </div>

          <div>
            <p>상세내용</p>
            <textarea
              name="content"
              value={content}
              onChange={change}
              disabled={isUpdate}
            />
          </div>
          {isUpdate ? (
            <>
              <button onClick={updateHandler}>수정</button>
              <button onClick={deleteBoard}>삭제</button>
            </>
          ) : (
            <button onClick={updateBoard}>수정 완료</button>
          )}
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
  );
};
