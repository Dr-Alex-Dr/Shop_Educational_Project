import React, { useEffect, useState } from 'react'
import { TopBar } from '../../components/TopBar'
import { Categories } from '../../components/Categories'
import { experimentalStyled as styled } from '@mui/material/styles';
import { Product } from '../../components/Product';
import { CartModal } from '../../components/CartModal';


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

export function Catalog({isCartModalOpen, setCartModalOpen, setCart, cart, setFavourites, favourites}: any) {
    const [goods, setGoods] = useState<GoodInfo[]>([])
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
            <div style={{display: 'flex'}}>
                <Categories setCurrentCategory={setCurrentCategory}/>
                
                <div style={{display: 'flex', flexDirection: 'column', padding: '100px 30px 0 200px', width: '100%'}}>
                {
                    goods && goods.map((item, index) => (
                        
                            <Product 
                            all={goods}

                            key={index}
                            goods={item}
                
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



