import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "../components/LandingPage";
import HeroSection from "../components/HeroSection";
import ProductDetail from "../components/ProductDetail";
import CartPage from "../components/CartPage";
import CheckoutPage from "../components/CheckoutPage";
import OrderConfirmation from "../components/OrderConfirmation";
import WishlistPage from "../components/WishlistPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hero" element={<HeroSection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </>
  );
}

export default App;