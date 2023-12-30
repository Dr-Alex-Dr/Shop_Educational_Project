import React, {Dispatch, SetStateAction} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IGoodInfo } from '../../interfaces';
import styles from './CartModal.module.css'

interface CartModalProps {
  open: boolean;
  setCartModalOpen: Dispatch<SetStateAction<boolean>>,
  cart: IGoodInfo[];
  setCart: Dispatch<SetStateAction<IGoodInfo[]>>
}


function scliceText(text: string) {
    if (text.length <= 30) {
      return text;
    } else {
      return text.slice(0, 30) + '...';
    }
  }

const CartModal = (props: CartModalProps) => {
  const { 
    open, 
    setCartModalOpen, 
    cart, 
    setCart
  } = props

  function countItemsWithId(arr: IGoodInfo[], targetId: number): number {
    const filteredArray = arr.filter(item => item.id === targetId);
    return filteredArray.length;
  }

  function handleAddProduct(item: IGoodInfo) {
    const updatedCart = [...cart]
    const indexToRemove  = updatedCart.findIndex(element => element.id === item.id);

    if (indexToRemove !== -1) {      
        let removedItem = updatedCart.splice(indexToRemove, 1)[0];
        setCart([...updatedCart])
        localStorage.setItem('cart', JSON.stringify([...updatedCart]));
    }
  }

  function handleRemoveProduct(item: IGoodInfo) {
    setCart([...cart, item])
    localStorage.setItem('cart', JSON.stringify([...cart, item]));
  }

  const uniqueIds = new Set();

  return (
    <Dialog open={open} onClose={() => {setCartModalOpen(false)}}>
      <DialogTitle>Корзина</DialogTitle>
      <DialogContent>
        {cart.map((item) => {
          if (uniqueIds.has(item.id)) return <></>;
          uniqueIds.add(item.id);

          return (
            <div className={styles.container} key={item.id}>
              <img className={styles.image} src={item.image} alt={item.title}/>
              <p>{scliceText(item.title)}</p>     
              <div className={styles.priceСontainer}>
                <p>Цена: {item.price * countItemsWithId(cart, item.id)}</p>
                <div className={styles.quantityContainer}>          
                  <IconButton onClick={() => {handleAddProduct(item)}}>
                    <RemoveIcon />
                  </IconButton>
                  {countItemsWithId(cart, item.id)}
                  <IconButton onClick={() => {handleRemoveProduct(item)}}>
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          )
        })}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => {setCartModalOpen(false)}} color="primary">Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CartModal

