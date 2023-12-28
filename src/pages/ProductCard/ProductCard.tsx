import React, { useEffect, useState } from 'react';
import { Product } from '../../components/Product';


export function ProductCard({ favourites, setFavourites, cart, setCart, all}: any) {
    const [good, setGood] = useState();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${1}`)
        .then(res => {
            return res.json()
        })
        .then(res => {
            setGood(res)
        })
    }, [])


    return (
        <div style={{paddingTop: 100}}>
            {
               good != undefined ? (
                <Product goods={good} favourites={favourites} setFavourites={setFavourites} cart={cart} setCart={setCart} all={[]}/>
               ) : (<></>)
            }
            
        </div>
    )
};

