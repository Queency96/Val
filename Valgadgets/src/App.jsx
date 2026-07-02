import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './componetnts/pages/Home';
import Wishlist from './componetnts/pages/Wishlist';
import SearchPage from './componetnts/pages/SearchPage';
import ProductDetails from './componetnts/pages/ProductDetails';
import AllCategories from './componetnts/pages/AllCategories';
import Cart from './componetnts/pages/Cart';
import Checkout from './componetnts/pages/Checkout';
import CategoryPage from './componetnts/pages/CategoryPage';
import BrandProducts from './componetnts/pages/BrandProducts';
import OrderSuccess from './componetnts/pages/OrderSuccess';

import Header from './componetnts/layouts/Header';
import Footer from './componetnts/layouts/Footer';
import MobileBottomNav from './componetnts/layouts/MobileBottomNav';

import QuickViewModal from './componetnts/ui/QuickViewModal';
import StickyCheckoutBar from './componetnts/sections/StickyCheckoutBar';

import AdminDashboard from './componetnts/admin/AdminDashboard';
import AdminLogin from './componetnts/admin/AdminLogin';
import ProtectedRoute from './componetnts/admin/ProtectedRoute';
import AdminProductCreate from './componetnts/admin/AdminProductCreate';

import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CheckoutProvider } from './context/CheckoutContext';

function App() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <AuthProvider>
      <CheckoutProvider>
        <WishlistProvider>
          <CartProvider>
            <div
              className='min-h-screen flex flex-col'
              style={{ background: '#969696' }}>
              {!isAdminPage && <Header />}

              {selectedProduct && (
                <QuickViewModal
                  product={selectedProduct}
                  onClose={closeModal}
                />
              )}

              <main className='flex-1'>
                <Routes>
                  {/* PUBLIC ROUTES */}
                  <Route
                    path='/'
                    element={<Home onQuickView={handleQuickView} />}
                  />

                  <Route
                    path='/wishlist'
                    element={<Wishlist onQuickView={handleQuickView} />}
                  />

                  <Route path='/search' element={<SearchPage />} />

                  <Route path='/categories/all' element={<AllCategories />} />

                  <Route path='/brand/:brandName' element={<BrandProducts />} />

                  <Route path='/products/:id' element={<ProductDetails />} />

                  <Route path='/cart' element={<Cart />} />

                  <Route path='/checkout' element={<Checkout />} />

                  <Route path='/order-success' element={<OrderSuccess />} />

                  <Route
                    path='/category/:category'
                    element={<CategoryPage />}
                  />

                  {/* ADMIN */}
                  <Route path='/admin/login' element={<AdminLogin />} />

                  <Route
                    path='/admin'
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path='/admin/product'
                    element={
                      <ProtectedRoute>
                        <AdminProductCreate />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>

              {!isAdminPage && (
                <>
                  <StickyCheckoutBar />
                  <MobileBottomNav />
                  <Footer />
                </>
              )}
            </div>
          </CartProvider>
        </WishlistProvider>
      </CheckoutProvider>
    </AuthProvider>
  );
}

export default App;
