import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import Categories from '../../components/Categories/Categories';
import Product from '../../components/Product/Product';
import { IGoodInfo } from '../../interfaces';
import axios from 'axios';
import styles from './Catalog.module.css'

interface ICatalog {
    setCart: Dispatch<SetStateAction<IGoodInfo[]>>
    cart: IGoodInfo[]
    setFavourites: Dispatch<SetStateAction<IGoodInfo[]>>
    favourites: IGoodInfo[]
}

export function Catalog(props: ICatalog) {
    const {
        setCart, 
        cart, 
        setFavourites, 
        favourites
    } = props

    const [goods, setGoods] = useState<IGoodInfo[]>([])
    const [currentCategory, setCurrentCategory] = useState<string>('')

    useEffect(() => {       
        axios.get(`https://fakestoreapi.com/products${currentCategory}`)
        .then(res => res.data)
        .then(res => setGoods(res))
        .catch(err => console.log(err))     
    }, [currentCategory])

    useEffect(() => {
        const storedfavourites = localStorage.getItem('favourites');
        const storesCart = localStorage.getItem('cart')

        if (storedfavourites) setFavourites(JSON.parse(storedfavourites));    
        if (storesCart) setCart(JSON.parse(storesCart))
    }, [])

    return (
        <div> 
            <div>
                <Categories setCurrentCategory={setCurrentCategory}/>            
                <div className={styles.productContainer}>
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



