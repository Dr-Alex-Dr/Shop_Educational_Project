import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Catalog } from './pages/Catalog/Catalog';
import { ProductCard } from './pages/ProductCard/ProductCard';

function App() {
  return (
    <Router>
      <div>


        

        <Route path="/" exact component={Catalog} />
        <Route path="/product" component={ProductCard} />
      </div>
    </Router>
  );
}

export default App;
