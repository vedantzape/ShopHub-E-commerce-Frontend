import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import API from "../services/api"

function Account() {

  const token = localStorage.getItem("token")
  const [user, setUser] = useState(null)

  useEffect(() => { fetchProfile() }, [])

  const fetchProfile = async () => {
    try {
      const response = await API.get("/auth/profile")
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  if (!token) return <Navigate to="/auth" />

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    alert("Logged Out Successfully")
    window.location.href = "/auth"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">My Account</h1>
        <p className="text-gray-600 mb-8">Manage your profile and account settings</p>

        {user && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-24 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                <div className="px-6 pb-6">
                  <div className="flex justify-center -mt-12 mb-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg border-4 border-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center text-slate-900 mb-1">{user.name}</h2>
                  <p className="text-center text-gray-600 mb-6">Customer Account</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6">📧 Contact Information</h3>
                <div className="space-y-4">
                  <div className="pb-4 border-b">
                    <label className="text-sm text-gray-600 block mb-1">Email Address</label>
                    <p className="text-lg font-semibold text-slate-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Full Name</label>
                    <p className="text-lg font-semibold text-slate-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 block mb-1">Role</label>
                    <p className={`text-lg font-bold ${user.role === "ADMIN" ? "text-green-600" : "text-blue-600"}`}>
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => window.location.href = "/orders"}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 rounded-xl">
                  📦 My Orders
                </button>
                {user?.role === "ADMIN" && (
                  <button onClick={() => window.location.href = "/admin"}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl">
                    ⚙️ Admin Panel
                  </button>
                )}
              </div>

              <button onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 rounded-xl">
                🚪 Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Account