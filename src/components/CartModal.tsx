import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface GoodInfo {
    id: number,
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

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  cartItems: GoodInfo[];
  setCart: any
}

function countItemsWithId(arr: GoodInfo[], targetId: number): number {
    const filteredArray = arr.filter(item => item.id === targetId);
    return filteredArray.length;
}


function scliceText(text: string) {
    if (text.length <= 30) {
      return text;
    } else {
      return text.slice(0, 30) + '...';
    }
  }



export function CartModal({ open, onClose, cartItems, setCart }: CartModalProps) {
    const uniqueIds = new Set();

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>Корзина</DialogTitle>
      <DialogContent>
        {cartItems.map((item) => {
              if (uniqueIds.has(item.id)) {
                    return null; // Элемент уже был отрисован, пропускаем его
                }

                // Добавляем id элемента в Set, чтобы отслеживать уникальность
                uniqueIds.add(item.id);

            return (
                <div key={item.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 500, marginBottom: 20}}>
                    <img src={item.image} alt={item.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    <div>{scliceText(item.title)}</div>
                    
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        
                        <div>Цена: {item.price * countItemsWithId(cartItems, item.id)}</div>
                        <div style={{width: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <IconButton onClick={() => {
                            let updatedCart = [...cartItems]
                            const indexToRemove  = updatedCart.findIndex(element => element.id === item.id);

                            if (indexToRemove  !== -1) {      
                                let removedItem  = updatedCart.splice(indexToRemove, 1)[0];
                                setCart([...updatedCart])
                                localStorage.setItem('cart', JSON.stringify([...updatedCart]));
                            }
                        } }>
                            <RemoveIcon />
                        </IconButton>
                        {
                            countItemsWithId(cartItems, item.id)
                        }
                        <IconButton onClick={() => {
                            setCart([...cartItems, item])
                            localStorage.setItem('cart', JSON.stringify([...cartItems, item]));
                        } }>
                            <AddIcon />
                        </IconButton>
                        </div>
                    </div>
                </div>
            )
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

