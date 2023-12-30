import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Card, CardContent, CardHeader, Typography, IconButton, Box, Rating } from '@mui/material';
import {useParams, Link} from 'react-router-dom'
import styles from './ProductCard.module.css'
import axios from 'axios';
import { IGoodInfo } from '../../interfaces';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CartButton from '../../components/CartButton/CartButton';
import FavouritesButton from '../../components/FavouritesButton/FavouritesButton';

interface IProductParams {
    id: string
}

interface IProductCard {
    setCart: Dispatch<SetStateAction<IGoodInfo[]>>
    cart: IGoodInfo[]
    setFavourites: Dispatch<SetStateAction<IGoodInfo[]>>
    favourites: IGoodInfo[]
}

const ProductCard = (props: IProductCard) => {
    const {
        favourites, 
        setFavourites, 
        cart, 
        setCart,
    } = props

    const [good, setGood] = useState<IGoodInfo>();
    const params: IProductParams = useParams();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${params.id}`)
        .then(res => res.data)
        .then(res => setGood(res))
    }, [])

    return (
        <Card className={styles.card}>
            <div className={styles.headerContainer}>
                <Link to={`/`}>
                    <ArrowBackIcon className={styles.arrowBack}/>
                </Link>
                <CardHeader title={good?.title}/>
            </div>
            
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={good?.image} alt={good?.title} className={styles.image} />
                </div>
                <CardContent>
                    <Typography className={styles.textInfo} variant="h6" color="text.secondary">
                        Цена: {good?.price}
                    </Typography>
                    <Typography className={styles.textInfo} variant="body2" color="text.secondary">
                    {good?.description}
                    </Typography>
                    <Box component="fieldset" mb={3}>
                        <Typography component="legend">Рейтинг:</Typography>
                        <Rating name="read-only" value={good?.rating.rate || 0} readOnly/>
                    </Box>
                    <Typography className={styles.textInfo} variant="subtitle2" color="text.secondary">
                    Количество в наличии: {good?.rating.count}
                    </Typography>
                    <div>    
                        {good && <CartButton good={good} goods={[]} setCart={setCart} cart={cart}/>}           
                        {good && <FavouritesButton good={good} goods={[]} setFavourites={setFavourites} favourites={favourites}/>} 
                    </div>    
                </CardContent>
            </div>
        </Card>
      );
};

export default ProductCard

