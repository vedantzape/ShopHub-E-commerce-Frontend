import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"

function Orders() {

  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await API.get("/orders")
      setOrders(response.data)
    } catch (error) {
      console.log(error)
      alert("Failed To Load Orders")
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'placed': return 'bg-yellow-100 text-yellow-800'
      case 'paid': return 'bg-green-100 text-green-800'          // NEW
      case 'delivered': return 'bg-emerald-100 text-emerald-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'placed': return '🛍️'
      case 'paid': return '💳'          // NEW
      case 'delivered': return '✓'
      case 'processing': return '⏳'
      case 'shipped': return '🚚'
      case 'cancelled': return '✕'
      default: return '•'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to place your first order</p>
            <button onClick={() => navigate("/")}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-3 rounded-lg">
              Shop Now
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">

                <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Order #{order.id}</h2>
                      <p className="text-gray-600 text-sm mt-1">
                        📅 {new Date(order.orderDate).toLocaleDateString('en-IN', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                        <span>{getStatusIcon(order.status)}</span>
                        <span>{order.status}</span>
                      </div>
                      <p className="text-lg font-bold text-orange-600">
                        Total: ₹ {order.totalAmount}
                      </p>
                      {/* NEW: show payment ID if available */}
                      {order.paymentId && (
                        <p className="text-xs text-gray-500">
                          Payment ID: {order.paymentId}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {order.items && order.items.length > 0 ? (
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 mb-1">
                              {item.product?.name || "Product"}
                            </h4>
                            <div className="flex gap-4 text-sm text-gray-600">
                              <span>Qty: {item.quantity}</span>
                              <span className="text-orange-600 font-semibold">
                                ₹ {item.price}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-slate-900">
                              ₹ {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No items in this order
                  </div>
                )}

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Order placed on {new Date(order.orderDate).toLocaleDateString()}
                  </div>
                  <button onClick={() => navigate("/")}
                    className="text-orange-600 hover:text-orange-700 font-semibold">
                    Order Similar Items →
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders