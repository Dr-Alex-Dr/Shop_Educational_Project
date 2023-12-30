import React, { useEffect, useState } from 'react'
import { TopBar } from '../../components/TopBar'
import { Categories } from '../../components/Categories'
import { experimentalStyled as styled } from '@mui/material/styles';
import { CartModal } from '../../components/CartModal';
import Product from '../../components/Product/Product';
import { IGoodInfo } from '../../interfaces';


export function Catalog({isCartModalOpen, setCartModalOpen, setCart, cart, setFavourites, favourites, setGoodId}: any) {
    const [goods, setGoods] = useState<IGoodInfo[]>([])
    const [currentCategory, setCurrentCategory] = useState('')

    useEffect(() => {
        const storedfavourites = localStorage.getItem('favourite');
        if (storedfavourites) {
            setFavourites(JSON.parse(storedfavourites));
        }

        fetch(`https://fakestoreapi.com/products`)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            setGoods(res)
        })
    }, [])

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${currentCategory}`)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            setGoods(res)
        })     
    }, [currentCategory])

    return (
        <div>
            <CartModal open={isCartModalOpen} setCartModalOpen={setCartModalOpen} cartItems={cart} setCart={setCart}/>   
            <div style={{}}>
                <Categories setCurrentCategory={setCurrentCategory}/>
                
                <div style={{display: 'flex', flexDirection: 'column', padding: '100px 30px 0 200px', width: '100%'}}>
                {
                    goods && goods.map((item, index) => (    
                        <Product 
                        key={index}
                        good={item}
                        goods={goods}
            
                        favourites={favourites} 
                        setFavourites={setFavourites}
            
                        cart={cart}
                        setCart={setCart}

                        />
                    
                    ))
                }
                </div>
                </div>     
        </div>
    )
}



