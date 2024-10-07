/* eslint-disable no-unused-vars */
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line react/prop-types
export default function ImgMediaCard({ name, time, img }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card
        sx={{
          width: { xs: '90vw', sm: '70vw', md: '30vw', lg: '14vw' },
          margin: 'auto',
          boxShadow: 3,
          borderRadius: 5,
        }}
      >
        <CardMedia
          component="img"
          alt={name}
          height="250"
          image={img}
          sx={{
            objectFit: 'cover',
          }}
        />
        <CardContent>
          <Typography
            variant="h1"
            component="div"
            gutterBottom
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.5rem' },
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h1"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '1.25rem', md: '1.5rem', lg: '3.75rem' },
            }}
          >
            {time}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
