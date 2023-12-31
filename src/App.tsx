import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom';
import { Catalog } from './pages/Catalog/Catalog';
import ProductCard from './pages/ProductCard/ProductCard';
import TopBar from './components/TopBar/TopBar';
import { IGoodInfo } from './interfaces';

const App = () =>{
  const [favourites, setFavourites] = useState<IGoodInfo[]>([])
  const [cart, setCart] = useState<IGoodInfo[]>([])

  return (
    <div style={{maxWidth: 1170}}>
      <HashRouter>
        <Router>
          <TopBar favourites={favourites} cart={cart} setCart={setCart}/>
          <Switch>
            <Route path="/" exact render={(props)=><Catalog {...props} favourites={favourites} setFavourites={setFavourites} cart={cart} setCart={setCart}/>}/>
            <Route path="/product/:id" render={(props)=><ProductCard {...props} favourites={favourites} setFavourites={setFavourites} cart={cart} setCart={setCart}/>}/>
          </Switch>
        </Router>
      </HashRouter>
    </div>
  );
}

export default App;
