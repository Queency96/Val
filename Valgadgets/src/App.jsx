import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AdminLayout from './componetnts/admin/layout/AdminLayout';
import ProtectedRoute from './componetnts/admin/components/ProtectedRoute';
import AdminDashboard from './componetnts/admin/components/AdminDashboard';
import AdminLogin from './componetnts/admin/components/AdminLogin';
import AdminProduct from './componetnts/admin/components/Products';
import AdminProductCreate from './componetnts/admin/components/AdminProductCreate';
import QuickViewModal from './componetnts/ui/QuickViewModal';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { CheckoutProvider } from './context/CheckoutContext';
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
import StickyCheckoutBar from './componetnts/sections/StickyCheckoutBar';
import Orders from './componetnts/admin/components/Orders';
import Customers from './componetnts/admin/customers/Customers';
// import Analytics from './componetnts/admin/analytics/Analytics';
// import Ana from './componetnts/admin/analytics/ana';
import AnalyticsStarts from './componetnts/admin/analytics/AnalysticsStarts';

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
            <div className='min-h-screen flex flex-col bg-[#969696]'>
              {!isAdminPage && <Header />}

              {selectedProduct && (
                <QuickViewModal
                  product={selectedProduct}
                  onClose={closeModal}
                />
              )}

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

                <Route
                  path='/categories/all'
                  element={<AllCategories onQuickView={handleQuickView} />}
                />

                <Route path='/brand/:brandName' element={<BrandProducts />} />

                <Route path='/products/:id' element={<ProductDetails />} />

                <Route path='/cart' element={<Cart />} />

                <Route path='/checkout' element={<Checkout />} />

                <Route path='/order-success' element={<OrderSuccess />} />

                <Route path='/category/:category' element={<CategoryPage />} />
                {/* ADMIN LOGIN */}
                <Route path='/admin/login' element={<AdminLogin />} />

                {/* ADMIN */}
                <Route
                  path='/admin'
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                  <Route index element={<AdminDashboard />} />

                  <Route path='products' element={<AdminProduct />} />

                  <Route path='product' element={<AdminProductCreate />} />

                  {/* Future Pages */}
                  <Route path='orders' element={<Orders />} />
                  <Route path='customers' element={<Customers />} />
                  <Route path='analytics' element={<AnalyticsStarts />} />
                  {/* <Route path="delivery" element={<Delivery />} /> */}
                  {/* <Route path="messages" element={<Messages />} /> */}
                  {/* <Route path="notifications" element={<Notifications />} /> */}
                  {/* <Route path="coupons" element={<Coupons />} /> */}
                  {/* <Route path="settings" element={<Settings />} /> */}
                </Route>

                {/* Other public routes go here */}
              </Routes>
            </div>

            {!isAdminPage && (
              <>
                <StickyCheckoutBar />
                <MobileBottomNav />
                <Footer />
              </>
            )}
          </CartProvider>
        </WishlistProvider>
      </CheckoutProvider>
    </AuthProvider>
  );
}

export default App;
