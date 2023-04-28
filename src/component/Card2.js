import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard() {
  return (
    <Card sx={{ minWidth: 285 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="120"
          image="https://icons.iconarchive.com/icons/dtafalonso/android-l/256/Youtube-icon.png"
          alt="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Youtuber
          </Typography>
          <Typography variant="body2" color="text.secondary">
            편집자 구합니다
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
