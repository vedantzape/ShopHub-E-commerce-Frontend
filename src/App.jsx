import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Account from "./pages/Account"
import Auth from "./pages/Auth"
import ProductDetails from "./pages/ProductDetails"
import AdminPanel from "./pages/AdminPanel"
import AdminRoute from "./components/AdminRoute"
import OAuth2Success from "./pages/OAuth2Success" // NEW
import Header from "./components/Header"
import BottomNav from "./components/BottomNav"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/oauth2/success" element={<OAuth2Success />} /> {/* NEW */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  )
}

export default App