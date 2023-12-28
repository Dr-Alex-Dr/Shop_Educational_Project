import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Catalog } from './pages/Catalog/Catalog';
import { ProductCard } from './pages/ProductCard/ProductCard';
import { TopBar } from './components/TopBar';

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

function App() {
  const [isCartModalOpen, setCartModalOpen] = useState(false);

  const [favourites, setFavourites] = useState<GoodInfo[]>([])
  const [cart, setCart] = useState<GoodInfo[]>([])

  const [goodId, setGoodId] = useState(1);

  return (
    <Router>
      <TopBar favourites={favourites} cart={cart} setCartModalOpen={setCartModalOpen}/>
        <Route path="/" exact render={(props)=><Catalog {...props} isCartModalOpen={isCartModalOpen} setCartModalOpen={setCartModalOpen} favourites={favourites} setFavourites={setFavourites} cart={cart} setCart={setCart} setGoodId={setGoodId}/>}/>
        <Route path="/product" render={(props)=><ProductCard {...props} favourites={favourites} setFavourites={setFavourites} cart={cart} setCart={setCart} isCartModalOpen={isCartModalOpen} setCartModalOpen={setCartModalOpen} goodId={goodId}/>}/>
    </Router>
  );
}

export default App;
