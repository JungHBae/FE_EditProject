import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { boardActions } from '../redux/modules/board';
import './Board.module.css';
import auth from '../api/auth';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const MotionContainer = motion(Container);

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
  const paytype = salary?.split(' ')[0];
  const paymoney = salary?.split(' ')[1];
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
  const changeDate = (e) => {
    setInputValue({
      ...inputValue,
      deadline: e,
    });
  };
  const updateHandler = () => {
    setIsUpdated((prev) => !prev);
  };
  const updateBoard = async () => {
    inputValue.salary = `${inputValue.salary} ${money}`;
    setInputValue(inputValue);
    // const response = await auth.put(`/board/${params.id}`, {
    //   ...inputValue,
    // });
    dispatch(boardActions.update(inputValue));
    setIsUpdated((prev) => !prev);
  };
  const deleteBoard = async () => {
    // const response = await auth.delete(`/board/${params.id}`);
    dispatch(boardActions.delete(Number(params.id)));
    navigate(`/board/`);
  };
  return (
    <MotionContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        sx={{
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1200px',
        }}
      >
        <Box
          sx={{
            marginTop: '3rem',
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
          }}
        >
          <form onSubmit={updateBoard}>
            <div>
              <FormControl sx={{ width: '600px' }} size="small">
                <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={genre}
                  name="genre"
                  label="Genre"
                  onChange={change}
                  disabled={isUpdate}
                >
                  <MenuItem value="genre1">genre1</MenuItem>
                  <MenuItem value="genre2">genre2</MenuItem>
                  <MenuItem value="genre3">genre3</MenuItem>
                </Select>
              </FormControl>

              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      label="deadline"
                      value={deadline}
                      disabled={isUpdate}
                      onChange={changeDate}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div style={{ marginTop: '15px' }}>
                <TextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={title}
                  autoComplete="off"
                  type="text"
                  size="small"
                  fullWidth
                  onChange={change}
                  disabled={isUpdate}
                />
              </div>
              <div style={{ width: '70%', float: 'left' }}>
                <div>
                  <FormControl
                    sx={{ width: '600px', marginTop: '15px' }}
                    size="small"
                  >
                    <InputLabel id="demo-simple-select-label">
                      Career
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={career}
                      name="career"
                      label="career"
                      onChange={change}
                      disabled={isUpdate}
                    >
                      <MenuItem value="1">1~3 years</MenuItem>
                      <MenuItem value="4">4~6 years</MenuItem>
                      <MenuItem value="10">10~15 years</MenuItem>
                      <MenuItem value="16">16~20 years</MenuItem>
                      <MenuItem value="21">21 years up</MenuItem>
                    </Select>
                  </FormControl>

                  <Box
                    sx={{
                      display: 'flex',
                      width: '600px',
                      gap: '20px',
                      marginTop: '15px',
                    }}
                  >
                    <FormControl sx={{ width: '290px' }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Salary
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={paytype}
                        name="salary"
                        label="salary"
                        onChange={change}
                        disabled={isUpdate}
                      >
                        <MenuItem value="month">월급</MenuItem>
                        <MenuItem value="si">시급</MenuItem>
                        <MenuItem value="gun">건당</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl sx={{ width: '290px' }} size="small">
                      <TextField
                        label="money"
                        variant="outlined"
                        name="money"
                        autoComplete="off"
                        type="number"
                        size="small"
                        value={money}
                        onChange={moneyHandle}
                        disabled={isUpdate}
                      />
                    </FormControl>
                  </Box>

                  <div>
                    <FormControl sx={{ width: '600px' }} size="small">
                      <TextField
                        id="outlined-multiline-static"
                        label="contents"
                        multiline
                        rows={8}
                        name="content"
                        value={content}
                        onChange={change}
                        margin="normal"
                        disabled={isUpdate}
                      />
                    </FormControl>
                  </div>
                  <FormControl sx={{ width: '600px' }} size="small">
                    {isUpdate ? (
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: '20px' }}
                        onClick={updateHandler}
                      >
                        수정
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: '20px' }}
                        onClick={updateBoard}
                      >
                        수정 완료
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: '20px' }}
                      onClick={deleteBoard}
                    >
                      삭제
                    </Button>
                  </FormControl>
                </div>
              </div>
            </div>
          </form>
        </Box>

        <Box
          sx={{
            width: '30%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
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
        </Box>
      </Box>
    </MotionContainer>
  );
};
