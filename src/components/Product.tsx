import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';


interface ProductInfo {
    title: string,
    price: number, 
    description: string,
    rating: number,
    quantity: number,
    imageUrl: string
}

export const Product = ({ title, price, description, rating, quantity, imageUrl }: ProductInfo) => {
    return (

        <Card style={{ display: 'flex', height: 250, marginBottom: 50}} onClick={() => {}}>
            <div style={{width: 250, height: 250}}>
            <CardMedia
            component="img"
            image={imageUrl}
            alt={title}    
        />
        </div>
          <CardContent style={{maxWidth: '80%'}}>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Цена: {price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Рейтинг:</Typography>
              <Rating name="read-only" value={rating} readOnly />
            </Box>
            <Typography variant="subtitle2" color="text.secondary">
              Количество в наличии: {quantity}
            </Typography>
            
          </CardContent>
        </Card>
      );
}