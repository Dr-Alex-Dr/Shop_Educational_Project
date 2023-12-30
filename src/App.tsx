import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Catalog } from './pages/Catalog/Catalog';
import { ProductCard } from './pages/ProductCard/ProductCard';
import TopBar from './components/TopBar/TopBar';
import { IGoodInfo } from './interfaces';

function App() {
  const [favourites, setFavourites] = useState<IGoodInfo[]>([])
  const [cart, setCart] = useState<IGoodInfo[]>([])

  const [goodId, setGoodId] = useState(1);

  return (
    <div style={{maxWidth: 1170}}>
      <Router>
        <TopBar favourites={favourites} cart={cart} setCart={setCart}/>
          <Route path="/Shop_Educational_Project/" exact render={(props)=><Catalog {...props} favourites={favourites} setFavourites={setFavourites} cart={cart} setCart={setCart} setGoodId={setGoodId}/>}/>
          <Route path="/Shop_Educational_Project/product" render={(props)=><ProductCard {...props} favourites={favourites} setFavourites={setFavourites} cart={cart} setCart={setCart} goodId={goodId}/>}/>
      </Router>
    </div>
  );
}

export default App;
