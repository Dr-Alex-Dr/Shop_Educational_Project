import React, {useState, Dispatch, SetStateAction, useEffect} from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/Button'
import classNames from 'classnames';
import styles from './FavouritesButton.module.css'
import { IGoodInfo } from '../../interfaces';

interface IFavouritesInfo {
    good: IGoodInfo,
    goods: IGoodInfo[],
    favourites: IGoodInfo[],
    setFavourites: Dispatch<SetStateAction<IGoodInfo[]>>
}

const FavouritesButton = (props: IFavouritesInfo) => {
    const {
        good,
        goods,
        favourites,
        setFavourites
    } = props

    const [favouritesButton, setfavouritesButton] = useState(false)

    function handleAddProductToFavorites() {
        const newFavouritesProducts = [...favourites, good]
        setFavourites(newFavouritesProducts);
        localStorage.setItem('favourites', JSON.stringify(newFavouritesProducts));
    }
      
    function handleRemoveFromFavorites() {
        const newFavouritesProducts = favourites.filter(item => item.id !== good.id);
        setFavourites(newFavouritesProducts);
        localStorage.setItem('favourites', JSON.stringify(newFavouritesProducts));
    }

    function handleClick() {
        favouritesButton ? handleRemoveFromFavorites() : handleAddProductToFavorites()
        setfavouritesButton(!favouritesButton)
    }

    useEffect(() => {
        const isFavourites = favourites.some((item: any) => item.id === good.id);
        setfavouritesButton(isFavourites)  
    }, [goods])

    return (
        <IconButton 
            color="primary" 
            onClick={() => {handleClick()}}>
            <FavoriteBorderOutlinedIcon 
                className={classNames(styles.favoriteIcon, {[styles.active]: favouritesButton})}/>
        </IconButton>
    )
}

export default FavouritesButton