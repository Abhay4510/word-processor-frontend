import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

const Header = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600">
                WordDrive
              </Link>
            </div>
            {isAuthenticated && (
              <nav className="ml-6 flex space-x-8">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Dashboard
                </Link>
                <Link
                  to="/create"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  New Letter
                </Link>
                <Link
                  to="/profile"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  Profile
                </Link>
              </nav>
            )}
          </div>
          {isAuthenticated && (
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-4 px-3 py-1 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header