import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Home() {

  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const navigate = useNavigate()

  // FIX: debounce - waits 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    fetchProducts()
  }, [debouncedSearch])

  const fetchProducts = async () => {
    try {
      let response
      if (debouncedSearch.trim() === "") {
        response = await API.get("/products")
      } else {
        response = await API.get(`/products/search?keyword=${debouncedSearch}`)
      }
      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("Please Login First")
        window.location.href = "/auth"
        return
      }
      await API.post(`/cart/add?productId=${productId}&quantity=1`, {})
      alert("Added To Cart")
    } catch (error) {
      console.log(error)
      alert("Failed To Add Cart")
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
            Welcome to ShopHub
          </h1>
          <p className="text-gray-600 text-lg mb-8">Discover amazing products at unbeatable prices</p>
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input type="text" placeholder="Search for products..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-3 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:border-orange-500 transition-all duration-300 shadow-md" />
              <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
          {products.map((product) => (
            <div key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              <div className="relative overflow-hidden bg-gray-200 h-48">
                <img onClick={() => navigate(`/product/${product.id}`)}
                  src={product.imageUrl ? product.imageUrl : "https://picsum.photos/300"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h2 onClick={() => navigate(`/product/${product.id}`)}
                  className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold text-orange-600 mb-4">₹ {product.price}</p>
                <button onClick={() => addToCart(product.id)}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home