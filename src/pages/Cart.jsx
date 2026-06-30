import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Cart() {

  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => { fetchCart() }, [])

  const fetchCart = async () => {
    try {
      const response = await API.get("/cart")
      setCartItems(response.data)
    } catch (error) {
      console.log(error)
      alert("Failed To Load Cart")
    }
  }

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`)
      fetchCart()
    } catch (error) {
      console.log(error)
      alert("Failed To Remove Item")
    }
  }

  const increaseQuantity = async (id) => {
    try {
      await API.put(`/cart/increase/${id}`, {})
      fetchCart()
    } catch (error) { console.log(error) }
  }

  const decreaseQuantity = async (id) => {
    try {
      await API.put(`/cart/decrease/${id}`, {})
      fetchCart()
    } catch (error) { console.log(error) }
  }

  // ADD THIS BACK
  const placeOrder = async () => {
    try {
      await API.post("/orders/place", {})
      alert("Order Placed Successfully")
      window.location.href = "/orders"
    } catch (error) {
      console.log(error)
      alert("Failed To Place Order")
    }
  }

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity, 0
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600 mb-8">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
            <button onClick={() => navigate("/")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-3 rounded-lg">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                  <div className="flex gap-6 p-6">
                    <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                      <img src={item.product.imageUrl || "https://picsum.photos/150"}
                        alt={item.product.name}
                        className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{item.product.description}</p>
                      </div>
                      <p className="text-xl font-bold text-orange-600">₹ {item.product.price}</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                        <button onClick={() => decreaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded font-bold">−</button>
                        <span className="font-bold text-lg min-w-[30px] text-center">{item.quantity}</span>
                        <button onClick={() => increaseQuantity(item.id)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded font-bold">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 px-3 py-2 rounded-lg font-semibold text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6 border-b pb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹ {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span className="font-semibold">₹ {(totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-6 text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">₹ {(totalAmount * 1.1).toFixed(2)}</span>
                </div>
                <button onClick={placeOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-xl mb-4">
                  🎉 Place Order
                </button>
                <button onClick={() => navigate("/")}
                  className="w-full bg-gray-100 text-slate-900 font-semibold py-3 rounded-xl">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart