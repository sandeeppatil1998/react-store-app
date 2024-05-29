import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import MyProfile from './pages/MyProfile';
import ProductDetails from './components/ProductDetails';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(index, 1); 
      setCart(updatedCart);
    }
  };
  

  return (
    <Router>
      <Header cartCount={cart.length} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
