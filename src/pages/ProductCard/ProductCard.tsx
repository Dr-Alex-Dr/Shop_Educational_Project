import React, { useEffect, useState } from 'react';
import Product from '../../components/Product/Product';


export function ProductCard({ favourites, setFavourites, cart, setCart, isCartModalOpen, setCartModalOpen, goodId}: any) {
    const [good, setGood] = useState();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${goodId}`)
        .then(res => {
            return res.json()
        })
        .then(res => {
            setGood(res)
        })
    }, [])


    return (
        <div style={{paddingTop: 100}}>
            {/* <CartModal open={isCartModalOpen} setCartModalOpen={setCartModalOpen} cartItems={cart} setCart={setCart}/>
            {
               good != undefined ? (
                <Product good={good} favourites={favourites} setFavourites={setFavourites} cart={cart} setCart={setCart} />
               ) : (<></>)
            }
             */}
        </div>
    )
};

