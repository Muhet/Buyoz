import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout, Blog } from './components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const { order, setOrder } = useState({});
  const { errorMessage, seterrorMessage } = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddCart = async (productId, quantity) => {
    const cart = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart)
  }
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }
  const refleshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }
  const handleCapttureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incommingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incommingOrder);
      refleshCart();
    } catch (error) {
      seterrorMessage(error.data.error.message)
    }

  }

  useEffect(() => {
    fetchProducts();
    fetchCart();

  }, []);

  return (

    <Router>
      <div>
        <Navbar totalItems={cart?.total_items} ></Navbar>

        <Routes>
          <Route path="/" exact element={<Products products={products} onAddToCart={handleAddCart} />} />
          <Route path="/Blog" exact element={<Blog />} />
          <Route path="/cart" exact element={<Cart
            cart={cart}
            handleUpdateCartQty={handleUpdateCartQty}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
          />} />
          <Route path="/checkout" exact element={<Checkout cart={cart}
            order={order}
            onCaptureCheckout={handleCapttureCheckout}
            error={errorMessage}
          />} />
        </Routes>

      </div>
    </Router>

  )
}

export default App;


