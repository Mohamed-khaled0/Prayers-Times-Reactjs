/* eslint-disable no-unused-vars */
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


// eslint-disable-next-line react/prop-types
export default function ImgMediaCard({name , time ,img}) {
  return (
    <Card sx={{ width: '12vw' }}>
      <CardMedia
        component="img"
        alt="img"
        height="140"
        image={img}
      />
      <CardContent>
        <h2 >
          {name}
        </h2>
        <Typography variant='h2' color='text.secondary'>
          {time}
        </Typography>
      </CardContent>

    </Card>
  );
}
