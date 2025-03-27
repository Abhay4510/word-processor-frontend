import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLetters } from "../../hooks/useLetters";

const Sidebar = () => {
  const { letters, fetchLetters, setCurrentLetter } = useLetters();
  const navigate = useNavigate();
  const { id: currentId } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLetters();
  }, [fetchLetters]);

  const handleLetterClick = (id: string) => {
    const selectedLetter = letters.find((l) => l._id === id);

    if (selectedLetter) {
      setCurrentLetter(selectedLetter);
      navigate(`/update/${id}`);
    }
  };

  const filteredLetters = letters.filter((letter) =>
    letter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-64 bg-white shadow-md rounded-lg p-4 h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">My Letters</h2>
        <Link to="/create" className="text-sm text-blue-600 hover:text-blue-800">
          + New
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search letters..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {filteredLetters.length === 0 ? (
          <p className="text-sm text-gray-500">No letters found</p>
        ) : (
          filteredLetters.map((letter) => (
            <div
              key={letter._id}
              onClick={() => handleLetterClick(letter._id)}
              className={`p-2 rounded-md hover:bg-gray-100 cursor-pointer ${
                currentId === letter._id ? "bg-blue-50 border border-blue-200" : ""
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
  );
};

export default Sidebar;
