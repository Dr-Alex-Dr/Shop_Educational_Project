import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { IGoodInfo } from '../../interfaces';
import styles from "./Product.module.css"
import CartButton from '../CartButton/CartButton';
import FavouritesButton from '../FavouritesButton/FavouritesButton';


interface IProduct {
  good: IGoodInfo,
  goods: IGoodInfo[],
  favourites: IGoodInfo[],
  setFavourites: Dispatch<SetStateAction<IGoodInfo[]>>,
  cart: IGoodInfo[],
  setCart: Dispatch<SetStateAction<IGoodInfo[]>>,
  key: number
}

const Product = (props: IProduct) => {
  const { 
    good, 
    goods,
    favourites, 
    setFavourites, 
    cart, 
    setCart,
  } = props

  return (
    <Card className={styles.card}>
      <div className={styles.imageContainer}>    
        <img src={good.image} alt={good.title} className={styles.image}/>      
      </div>

      <CardContent className={styles.cardContent}>
        <Typography variant="h5" component="div">
          <Link to={`/Shop_Educational_Project/product/${good.id}`}>{good.title}</Link>
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Цена: {good.price}
        </Typography>
        <Typography className={styles.description} variant="body2" color="text.secondary">
          {good.description}
        </Typography>
        <Box className={styles.ratingContainer} component="fieldset" mb={3}>
          <Typography component="legend">Рейтинг:</Typography>
          <Rating name="read-only" value={good.rating.rate} readOnly/>
        </Box>
        <Typography variant="subtitle2" color="text.secondary">
          Количество в наличии: {good.rating.count}
        </Typography>
        <div>               
          <CartButton good={good} goods={goods} setCart={setCart} cart={cart}/>
          <FavouritesButton good={good} goods={goods} setFavourites={setFavourites} favourites={favourites}/>
        </div>     
      </CardContent>

    </Card>
  );
}

export default Product;
