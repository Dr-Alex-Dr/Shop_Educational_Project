import React, {useState, Dispatch, SetStateAction} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import { IGoodInfo } from '../../interfaces';
import styles from "./TopBar.module.css"
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CartModal from '../CartModal/CartModal';
import { Link } from 'react-router-dom';


interface ProductsArray {
    favourites: IGoodInfo[]
    cart: IGoodInfo[]
    setCart: Dispatch<SetStateAction<IGoodInfo[]>>
}

const TopBar = (props: ProductsArray) => {
  const {
    favourites,
    cart,
    setCart,
  } = props

  const [cartModalOpen, setCartModalOpen] = useState(false);

  function handleOpenCart() {
    cart.length > 0 ? setCartModalOpen(true) : setCartModalOpen(false)
  }
  
  return (
    <Box className={styles.container}>
      <AppBar className={styles.appBar}>
        <Toolbar>     
          <Typography variant="h6">
            <Link className={styles.linkHome} to={'/'}>ShopEProject</Link>
          </Typography>
          <div className={styles.search}>
            <div className={styles.iconWrapper}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              className={styles.inputBase}
            />
          </div>
          
          <Box className={styles.saveContainer}>
            <IconButton onClick={() => {handleOpenCart()}} size="large" color="inherit">
              <Badge badgeContent={cart.length} color="error">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={favourites.length} color="error">
                <FavoriteBorderOutlinedIcon />
              </Badge>
            </IconButton>         
          </Box>
        </Toolbar>
      </AppBar>

    <CartModal cartModalOpen={cartModalOpen} setCartModalOpen={setCartModalOpen} cart={cart} setCart={setCart}/>
    </Box>
  );
}

export default TopBar