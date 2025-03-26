import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useLetters } from "../../hooks/useLetters"

const Sidebar = () => {
  const { letters, fetchLetters, setCurrentLetter } = useLetters()
  const navigate = useNavigate()
  const { id: currentId } = useParams<{ id: string }>()

  useEffect(() => {
    fetchLetters()
  }, [fetchLetters])

  const handleLetterClick = (id: string) => {
    const selectedLetter = letters.find((l) => l._id === id)
    
    if (selectedLetter) {
      setCurrentLetter(selectedLetter)
      
      navigate(`/update/${id}`)
    }
  }

  return (
    <aside className="w-64 bg-white shadow-md rounded-lg p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">My Letters</h2>
        <Link to="/create" className="text-sm text-blue-600 hover:text-blue-800">
          + New
        </Link>
      </div>
      <div className="space-y-2">
        {letters.length === 0 ? (
          <p className="text-sm text-gray-500">No letters yet</p>
        ) : (
          letters.map((letter) => (
            <div
              key={letter._id}
              onClick={() => handleLetterClick(letter._id)}
              className={`p-2 rounded-md hover:bg-gray-100 cursor-pointer ${
                currentId === letter._id ? 'bg-blue-50 border border-blue-200' : ''
              }`}
            >
              <h3 className="text-sm font-medium text-gray-800 truncate">
                {letter.title || "Untitled"}
              </h3>
              <p className="text-xs text-gray-500">
                {new Date(letter.updatedAt).toLocaleDateString()}
              </p>
              {letter.savedToDrive && (
                <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium bg-green-100 text-green-800">
                  Drive
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </aside>
  )
}

export default Sidebar