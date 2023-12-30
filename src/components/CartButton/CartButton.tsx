import React, {useState, Dispatch, SetStateAction, useEffect} from 'react'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import IconButton from '@mui/material/Button'
import classNames from 'classnames'
import styles from './CartButton.module.css'
import { IGoodInfo } from '../../interfaces'

interface ICartInfo {
    good: IGoodInfo,
    goods: IGoodInfo[],
    cart: IGoodInfo[],
    setCart: Dispatch<SetStateAction<IGoodInfo[]>>
}

const CartButton = (props: ICartInfo) => {
    const {
        good,
        goods,
        cart,
        setCart
    } = props

    const [cartButton, setCartButton] = useState(false)

    function handleAddProductToCart() {
        const newCartProducts = [...cart, good]
        setCart(newCartProducts);
        localStorage.setItem('cart', JSON.stringify(newCartProducts));
    }
      
    function handleRemoveFromCart() {
        const newCartProducts = cart.filter(item => item.id !== good.id);
        setCart(newCartProducts);
        localStorage.setItem('cart', JSON.stringify(newCartProducts));
    }

    useEffect(() => {
        cartButton ? handleAddProductToCart() : handleRemoveFromCart()
    }, [cartButton])

    useEffect(() => {
        const isCart = cart.some((item: any) => item.id === good.id);
        setCartButton(isCart)
    }, [goods])

    return (
        <IconButton 
            color="primary"
            onClick={() => {setCartButton(!cartButton)}}>
            <ShoppingBagOutlinedIcon  
                className={classNames(styles.cartIcon, {[styles.active]: cartButton})}/>
        </IconButton>      
    )
}

export default CartButton
