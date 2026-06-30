import { useState } from "react"
import API from "../services/api"

function Auth() {

  const [isLogin, setIsLogin] = useState(true)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      )

     localStorage.setItem(
  "token",
  response.data.token
)

localStorage.setItem(
  "role",
  response.data.role
)

      alert("Login Successful")

      window.location.href = "/"

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      )
    }
  }

  // REGISTER
  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
          address
        }
      )

      alert("Account Created Successfully")

      setIsLogin(true)

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      )
    }
  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 pt-20">

      <div className="w-full max-w-md mx-4">

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-12 text-white text-center">
            <h1 className="text-4xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Join Us"}
            </h1>
            <p className="text-orange-100">
              {isLogin 
                ? "Login to your account to continue shopping" 
                : "Create an account to get started"}
            </p>
          </div>

          {/* Form Container */}
          <div className="px-8 py-10">

            <form
              onSubmit={
                isLogin
                  ? handleLogin
                  : handleRegister
              }
              className="space-y-5"
            >

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-300 hover:border-gray-400"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="123 Main Street, City"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-300 hover:border-gray-400"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-300 hover:border-gray-400"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition-all duration-300 hover:border-gray-400"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl mt-6"
              >
                {isLogin ? "🔓 Login" : "✨ Create Account"}
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              <hr className="flex-1 border-gray-300" />
              <span className="px-4 text-gray-500 font-semibold text-sm">
                OR
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google OAuth */}
           <button
  type="button"
  className="w-full border-2 border-gray-300 text-slate-900 font-semibold py-3 rounded-xl flex justify-center items-center gap-3 hover:bg-gray-50 transition-all duration-300 hover:border-orange-500 hover:shadow-lg"
  onClick={() =>
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google"
  }
>
  <span className="text-xl">🔐</span>
  Continue with Google
</button>

          </div>

          {/* Toggle Section */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <p className="text-center text-gray-700 text-sm mb-3">
              {isLogin ? "New to ShopHub?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full py-2.5 text-orange-600 font-bold hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-300 text-center"
            >
              {isLogin ? "Create Account" : "Login Here"}
            </button>
          </div>

        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-300 text-sm mt-6">
          By signing up, you agree to our Terms of Service
        </p>

      </div>

    </div>
  )
}

export default Auth