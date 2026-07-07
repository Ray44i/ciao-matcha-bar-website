import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Menu from "./pages/Menu.jsx";
import OrderOnline from "./pages/OrderOnline.jsx";

import Reservations from "./pages/Reservations.jsx";
import Location from "./pages/Location.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Shop from "./pages/Shop.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<OrderOnline />} />
       
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/location" element={<Location />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
