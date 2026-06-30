import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function OAuth2Success() {

  const navigate = useNavigate()

  useEffect(() => {

    // Extract token and role from URL
    const params = new URLSearchParams(
      window.location.search
    )

    const token = params.get("token")
    const role = params.get("role")

    if (token) {
      localStorage.setItem("token", token)
      localStorage.setItem("role", role)
      navigate("/")
    } else {
      navigate("/auth")
    }

  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <p className="text-gray-600 mt-4 text-lg">
          Signing you in with Google...
        </p>
      </div>
    </div>
  )
}

export default OAuth2Success