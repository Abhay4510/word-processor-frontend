import { useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"
import { useLetters } from "../hooks/useLetters"

const Dashboard = () => {
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
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <Link
                  to="/create"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Create New Letter
                </Link>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Letters</h2>
                {letters.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't created any letters yet.</p>
                    <Link to="/create" className="text-blue-600 hover:text-blue-800">
                      Create your first letter
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {letters.slice(0, 6).map((letter) => (
                      <div key={letter._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <Link to={`/update/${letter._id}`}>
                          <h3 className="font-medium text-gray-900 mb-1 truncate">
                            {letter.title || "Untitled"}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {new Date(letter.updatedAt).toLocaleDateString()}
                          </p>
                        </Link>
                        {letter.savedToDrive && letter.driveFileId && (
                          <a
                            href={`https://docs.google.com/document/d/${letter.driveFileId}/edit`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium bg-green-100 text-green-800"
                          >
                            Open in Drive
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard