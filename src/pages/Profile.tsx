import { useEffect } from "react"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"
import { useAuth } from "../hooks/useAuth"
import { useLetters } from "../hooks/useLetters"

const Profile = () => {
  const { user } = useAuth()
  const { letters, fetchLetters } = useLetters()

  useEffect(() => {
    fetchLetters()
  }, [fetchLetters])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64">
            <Sidebar />
          </div>
          <div className="flex-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">User ID</p>
                      <p className="font-medium">{user?._id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="font-medium capitalize">{user?.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Activity</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">Total Letters</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {letters.length}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">Saved to Drive</p>
                    <p className="text-2xl font-bold text-green-800">
                      {letters.filter((l) => l.savedToDrive).length}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">Drafts</p>
                    <p className="text-2xl font-bold text-purple-800">
                      {letters.filter((l) => !l.savedToDrive).length}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile