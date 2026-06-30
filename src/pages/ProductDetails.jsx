import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import API from "../services/api"

function ProductDetails() {

  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products/${id}`)
      setProduct(response.data)
    } catch (error) {
      console.log(error)
      alert("Failed To Load Product")
    }
  }

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        alert("Please Login First")
        window.location.href = "/auth"
        return
      }
      // FIX: removed hardcoded userId=1
      await API.post(`/cart/add?productId=${id}&quantity=${quantity}`, {})
      alert("Added To Cart")
    } catch (error) {
      console.log(error)
      alert("Failed To Add Cart")
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading product details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-24">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8">
          ← Back to Products
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={product.imageUrl ? product.imageUrl : "https://picsum.photos/600"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
            <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-200">
              <p className="text-gray-700 text-sm font-semibold mb-2">PRICE</p>
              <p className="text-5xl font-bold text-orange-600">₹ {product.price}</p>
            </div>
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-3">Quantity:</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 hover:bg-gray-300 font-bold w-12 h-12 rounded-lg">−</button>
                <span className="text-2xl font-bold min-w-[50px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 font-bold w-12 h-12 rounded-lg">+</button>
              </div>
            </div>
            <button onClick={addToCart}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 mb-4">
              🛒 Add To Cart
            </button>
            <button className="w-full bg-slate-100 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-200">
              ♡ Save For Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails