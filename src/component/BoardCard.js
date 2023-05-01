import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, CardActionArea, CardContent } from '@mui/material';

const Boardcard = ({ id, title, deadline }) => {
  const navigate = useNavigate();
  const intoDetail = () => {
    navigate(`/board/${id}`);
  };
  return (
    <Card sx={{ minWidth: 250 }} onClick={intoDetail}>
      <CardActionArea>
        {/* <CardMedia component="img" height="120" image="" alt="img" /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            작성자: {} <br />
            태그(Youtuber / Editor)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            마감일: {deadline}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Boardcard;
