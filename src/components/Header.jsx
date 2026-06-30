import { Link, useLocation } from "react-router-dom"
import { useState } from "react"

function Header() {
  const location = useLocation()
  const token = localStorage.getItem("token")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    alert("Logged Out Successfully")
    window.location.href = "/auth"
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          >
            ShopHub
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link
              to="/"
              className={`relative font-medium transition-all duration-300 ${
                isActive("/")
                  ? "text-orange-500"
                  : "text-gray-300 hover:text-orange-500"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
              )}
            </Link>

            <Link
              to={token ? "/cart" : "/auth"}
              className={`relative font-medium transition-all duration-300 ${
                isActive("/cart")
                  ? "text-orange-500"
                  : "text-gray-300 hover:text-orange-500"
              }`}
            >
              Cart
              {isActive("/cart") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
              )}
            </Link>

            <Link
              to={token ? "/orders" : "/auth"}
              className={`relative font-medium transition-all duration-300 ${
                isActive("/orders")
                  ? "text-orange-500"
                  : "text-gray-300 hover:text-orange-500"
              }`}
            >
              Orders
              {isActive("/orders") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
              )}
            </Link>

            {token ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/account"
                  className={`relative font-medium transition-all duration-300 ${
                    isActive("/account")
                      ? "text-orange-500"
                      : "text-gray-300 hover:text-orange-500"
                  }`}
                >
                  Account
                  {isActive("/account") && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 border-t border-gray-700 pt-4">
            <Link
              to="/"
              className="block py-2 text-gray-300 hover:text-orange-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={token ? "/cart" : "/auth"}
              className="block py-2 text-gray-300 hover:text-orange-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cart
            </Link>
            <Link
              to={token ? "/orders" : "/auth"}
              className="block py-2 text-gray-300 hover:text-orange-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Orders
            </Link>
            {token ? (
              <>
                <Link
                  to="/account"
                  className="block py-2 text-gray-300 hover:text-orange-500 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block py-2 text-orange-400 hover:text-orange-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
