import React, { useEffect, useState } from 'react'
import { TopBar } from '../../components/TopBar'
import { Categories } from '../../components/Categories'
import { experimentalStyled as styled } from '@mui/material/styles';
import { Product } from '../../components/Product';

interface GoodInfo {
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

export const Catalog = () => {
    const [goods, setGoods] = useState<GoodInfo[]>([])
    const [currentCategory, useCurrentCategory] = useState<string>('')

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products`)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            setGoods(res)
        })
    }, [])

    return (
        <div>
            <TopBar/>
            <div style={{display: 'flex'}}>
                <Categories />
                
                <div style={{display: 'flex', flexDirection: 'column', padding: '100px 30px 0 200px'}}>
                {
                    goods.map((item, index) => (
                        <Product 
                            key={index} 
                            title={item.title} 
                            price={item.price}
                            description={item.description}
                            rating={item.rating.rate}
                            quantity={item.rating.count}
                            imageUrl={item.image}
                        />
                    ))
                }
                </div>
                </div>     
        </div>
    )
}



