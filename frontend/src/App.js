import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Cart from "./features/cart/Cart";
import ProductsList from "./features/products/ProductsList";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/NotFound";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/' component={ProductsList} />
        <Route exact path='/cart' component={Cart} />
        <Route component={NotFound} />
      </Switch>
      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
