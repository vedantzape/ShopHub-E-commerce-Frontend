import { Link, useLocation } from "react-router-dom"

function BottomNav() {

  const location = useLocation()

  const token = localStorage.getItem("token")

  const isActive = (path) => location.pathname === path

  // Hide BottomNav on Home, Cart, and Orders pages
  const hiddenPaths = ["/", "/cart", "/orders"]
  if (hiddenPaths.includes(location.pathname)) {
    return null
  }

  return (

    <div className="hidden md:flex fixed bottom-0 left-0 w-full bg-white shadow-xl border-t border-gray-200">

      <div className="max-w-7xl mx-auto w-full px-4 py-4 flex justify-around items-center">

        <Link
          to="/"
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            isActive("/")
              ? "bg-orange-100 text-orange-600"
              : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          }`}
        >
          🏠 Home
        </Link>

        <Link
          to={token ? "/cart" : "/auth"}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            isActive("/cart")
              ? "bg-orange-100 text-orange-600"
              : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          }`}
        >
          🛒 Cart
        </Link>

        <Link
          to={token ? "/orders" : "/auth"}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            isActive("/orders")
              ? "bg-orange-100 text-orange-600"
              : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          }`}
        >
          📦 Orders
        </Link>

        <Link
          to={token ? "/account" : "/auth"}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            isActive("/account") ||
            isActive("/auth")
              ? "bg-orange-100 text-orange-600"
              : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
          }`}
        >
          👤 Account
        </Link>

      </div>

    </div>

  )
}

export default BottomNav