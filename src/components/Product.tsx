import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/Button';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link } from 'react-router-dom';

interface GoodInfo {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: {
        rate: number,
        count: number
    }
}

function scliceText(text: string) {
    if (text.length <= 100) {
      return text;
    } else {
      return text.slice(0, 100) + '...';
    }
  }

export function Product({ goods, favourites, setFavourites, cart, setCart, all}: any) {
    const [cartButton, setCartButton] = useState(false)
    const [favouritesButton, setfavouritesButton] = useState(false)


    useEffect(() => {
        const storedfavourites = localStorage.getItem('favourite');
        const storedcarts = localStorage.getItem('cart');

        if (storedcarts) {
            const isCart = JSON.parse(storedcarts).some((item: any) => item.id === goods.id);
            if (isCart) {
                setfavouritesButton(true)
            } else {
                setfavouritesButton(false)
            }
                    
            setCart(JSON.parse(storedcarts));  
        }

        if (storedfavourites) {
            const isFavourite = JSON.parse(storedfavourites).some((item: any) => item.id === goods.id);
            if (isFavourite) {
                setCartButton(true)
            } else {
                setCartButton(false)
            }
                    
            setFavourites(JSON.parse(storedfavourites));           
        }
    }, [all])

    const toggleFavourite = (good: GoodInfo) => {
        const isFavourite = favourites.some((item: any) => item.id === good.id);
    
        if (isFavourite) {
          const updatedFavourites = favourites.filter((item: any) => item.id !== good.id);
          setFavourites(updatedFavourites);
          localStorage.setItem('favourite', JSON.stringify(updatedFavourites));
        } else {
          setFavourites([...favourites, good]);
          localStorage.setItem('favourite', JSON.stringify([...favourites, good]));
        }   
      };

      const toggleCarts = (good: GoodInfo) => {
        const isFavourite = cart.some((item: any) => item.id === good.id);
    
        if (isFavourite) {
          const updatedCarts = cart.filter((item: any) => item.id !== good.id);
          setCart(updatedCarts);
          localStorage.setItem('cart', JSON.stringify(updatedCarts));
        } else {
            setCart([...cart, good]);
            localStorage.setItem('cart', JSON.stringify([...cart, good]));
        }
      };

    return (
        <Card style={{ display: 'flex', height: 250, marginBottom: 50, position: 'relative', width: '100%'}} onClick={() => {}}>
            <div style={{width: 250, height: 250, padding: 5}}>    
                <img src={goods.image} alt={goods.title} style={{width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center'}}/>      
            </div>
          <CardContent style={{maxWidth: '80%'}}>
            <Typography variant="h5" component="div">
              <Link to='/product'>{goods.title}</Link>
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Цена: {goods.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {scliceText(goods.description)}
            </Typography>
            <Box component="fieldset" mb={3} borderColor="transparent" style={{padding: 0, marginTop: 10}}>
              <Typography component="legend">Рейтинг:</Typography>
              <Rating name="read-only" value={goods.rating.rate} readOnly />
            </Box>
            <Typography variant="subtitle2" color="text.secondary">
              Количество в наличии: {goods.rating.count}
            </Typography>

            <div>               
                <IconButton 
                    color="primary" 
                    style={{borderRadius: 100, position: 'absolute', right: 0, top: 10}} 
                    onClick={() => {
                        setfavouritesButton(!favouritesButton)
                        toggleCarts(goods)}}>
                    <ShoppingBagOutlinedIcon style={{fontSize: 28, color: favouritesButton ? 'red' : ''}}/>
                </IconButton>

                <IconButton 
                    color="primary" 
                    style={{borderRadius: 100, position: 'absolute', right: 50, top: 10}} 
                    onClick={() => {
                        setCartButton(!cartButton)
                        toggleFavourite(goods)        
                        }}>
                    <FavoriteBorderOutlinedIcon style={{fontSize: 28, color: cartButton ? 'red' : ''}}/>
                </IconButton>
            </div>        
          </CardContent>
        </Card>
      );
}