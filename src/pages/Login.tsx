import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import GoogleLoginButton from "../components/Auth/GoogleLoginButton"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    document.title = "Login - WordDrive"
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">WordDrive</h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create and save letters to your Google Drive
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login