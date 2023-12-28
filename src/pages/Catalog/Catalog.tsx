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

export function Catalog() {
    const [goods, setGoods] = useState<GoodInfo[]>([])
    const [currentCategory, setCurrentCategory] = useState('')


    useEffect(() => {
        fetch(`https://fakestoreapi.com/products`)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            setGoods(res)
        })
    }, [])

    useEffect(() => {
        console.log(currentCategory)
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
            <TopBar/>
            <div style={{display: 'flex'}}>
                <Categories setCurrentCategory={setCurrentCategory}/>
                
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



