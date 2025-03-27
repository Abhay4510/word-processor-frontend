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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-12 flex-col justify-center items-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-6">WordDrive</h1>
          <p className="text-xl mb-8">
            Your personal letter companion for creating and managing documents with Google Drive integration.
          </p>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Easy Document Creation</h3>
                <p className="mt-1">Create and format documents with our intuitive editor.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Google Drive Integration</h3>
                <p className="mt-1">Save and access your documents directly from Google Drive.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium">Secure Access</h3>
                <p className="mt-1">Your documents are secure with Google authentication.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 md:hidden">WordDrive</h1>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to access your documents and letters</p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <GoogleLoginButton />
              </div>
            </div>

            <div className="mt-6">
              <p className="mt-8 text-xs text-center text-gray-500">
                By signing in, you agree to our
                <a href="#" className="text-blue-600 hover:text-blue-800 mx-1">
                  Terms of Service
                </a>
                and
                <a href="#" className="text-blue-600 hover:text-blue-800 mx-1">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login