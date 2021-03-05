import React, { useEffect } from 'react';
import { BrowserRouter , Route, Switch} from "react-router-dom";
import { useQuery } from '@apollo/client';
import Cart from './components/cart/cart';
import NavBar from './components/Nav/navbar';
import Orders from './components/order/order';
import BookDetails from './pages/BookDetails';
import HomePage from './pages/HomePage';
import { BOOK_LIST, GET_CART_LIST } from './graphql/queries';
import AddBook from './pages/addNewBook';

function App() {
//useQuery(GET_CART_LIST);
// useQuery(BOOK_LIST);
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/book/:id" exact component={BookDetails} />
          <Route path="/orders" exact component={Orders} />
          <Route path="/cart" exact component={Cart} />
          <Route path="/add-book" exact component={AddBook} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
