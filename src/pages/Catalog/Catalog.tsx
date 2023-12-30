import React, { useEffect, useState } from 'react'
import Categories from '../../components/Categories/Categories';
import CartModal from '../../components/CartModal/CartModal';
import Product from '../../components/Product/Product';
import { IGoodInfo } from '../../interfaces';
import axios from 'axios';


export function Catalog({isCartModalOpen, setCartModalOpen, setCart, cart, setFavourites, favourites, setGoodId}: any) {
    const [goods, setGoods] = useState<IGoodInfo[]>([])
    const [currentCategory, setCurrentCategory] = useState<string>('')

    useEffect(() => {
        const storedfavourites = localStorage.getItem('favourite');

        if (storedfavourites) {
            setFavourites(JSON.parse(storedfavourites));
        }

        axios.get(`https://fakestoreapi.com/products${currentCategory}`)
        .then(res => res.data)
        .then(res => setGoods(res))
        .catch(err => console.log('Нет данных'))
       
    }, [currentCategory])

    return (
        <div> 
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



