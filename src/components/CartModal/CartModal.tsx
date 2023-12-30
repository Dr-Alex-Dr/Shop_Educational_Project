import React, {Dispatch, SetStateAction} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IGoodInfo } from '../../interfaces';
import styles from './CartModal.module.css'

interface CartModalProps {
  cartModalOpen: boolean;
  setCartModalOpen: Dispatch<SetStateAction<boolean>>,
  cart: IGoodInfo[];
  setCart: Dispatch<SetStateAction<IGoodInfo[]>>
}

const CartModal = (props: CartModalProps) => {
  const { 
    cartModalOpen, 
    setCartModalOpen, 
    cart, 
    setCart
  } = props

  function countItemsWithId(targetId: number): number {
    const filteredArray = cart.filter(item => item.id === targetId);
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

  function calculatesСostFromQuantity(item: IGoodInfo): number{
    return parseFloat((item.price * countItemsWithId(item.id)).toFixed(2))
  }

  const uniqueIds = new Set();

  return (
    <Dialog open={cartModalOpen} onClose={() => {setCartModalOpen(false)}}>
      <DialogTitle>Корзина</DialogTitle>
      <DialogContent>
        {cart.map((item) => {
          if (uniqueIds.has(item.id)) return <></>;
          uniqueIds.add(item.id);

          return (
            <div className={styles.container} key={item.id}>
              <div className={styles.imageContainer}>
                <img className={styles.image} src={item.image} alt={item.title}/>
              </div>
              <p>{item.title}</p>     
              <div className={styles.priceСontainer}>
                <p>Цена: {calculatesСostFromQuantity(item)}</p>
                <div className={styles.quantityContainer}>          
                  <IconButton onClick={() => {handleAddProduct(item)}}>
                    <RemoveIcon />
                  </IconButton>
                  {countItemsWithId(item.id)}
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

