import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boardcard from '../component/BoardCard';
import { useSelector } from 'react-redux';
import CheckTokenExpiration from '../component/CheckTokenExpiration';
import { TextField, Button, Box, Container } from '@mui/material';
import { motion } from 'framer-motion';

const MotionContainer = motion(Container);

export const BoardPage = () => {
  const navigate = useNavigate();
  const WritePost = () => {
    navigate('/boardEdit');
    // if (CheckTokenExpiration()) {
    //   navigate('/boardEdit');
    // } else {
    //   alert('게시물작성은 로그인상태에서만 가능합니다');
    // }
  };
  const boards = useSelector((state) => state.board);
  return (
    <MotionContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        sx={{
          marginTop: '1rem',
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'row',
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button variant="contained" sx={{}} type="submit">
          Youtuber
        </Button>
        <Button variant="contained" sx={{}} type="submit">
          Editor
        </Button>

        <TextField
          label="Search*"
          variant="outlined"
          name="search"
          autoComplete="off"
          type="text"
          size="small"
        />

        <Button variant="contained" sx={{ ml: '100px' }} onClick={WritePost}>
          Write board
        </Button>
      </Box>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {boards?.map((item) => (
          <Boardcard
            key={item.id}
            id={item.id}
            title={item.title}
            deadline={item.deadline?.$d.toLocaleDateString()}
          />
        ))}
      </div>
    </MotionContainer>
  );
};
