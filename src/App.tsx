import React from 'react';
import Layout from './components/layout/Layout';
import { Navbar } from './components/layout/Navbar';
import { CartProvider } from './context/CartContext';
import "./index.css"
//import ProductCard from '../src/components/product/ProductCard';
import { ShopMenPage } from './pages/Shop/ShopMenPage';
import { ShopWomenPage } from './pages/Shop/ShopWomenPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Navbar />
          <Routes>
            <Route path="/men" element={<ShopMenPage />} />
            <Route path="/women" element={<ShopWomenPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
