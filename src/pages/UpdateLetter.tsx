import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { letterService } from "../services/letterService"
import { LetterFormData } from "../types/letter"
import AdvancedEditor  from "../components/Editor/TextEditor"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"

const UpdateLetter = () => {
  const { token } = useAuth()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState<LetterFormData>({ 
    title: "", 
    content: "" 
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLetter = async () => {
      setIsLoading(true)
      setError(null)

      if (!token || !id) {
        setIsLoading(false)
        return
      }

      try {
        const fetchedLetter = await letterService.getLetter(token, id)
        
        setFormData({
          title: fetchedLetter.title || "",
          content: fetchedLetter.content || "",
        })
        
        console.log("Fetched Letter:", fetchedLetter)
      } catch (error) {
        console.error("Failed to fetch letter:", error)
        setError("Failed to load letter")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLetter()
  }, [token, id])

  const handleEditorChange = (data: LetterFormData) => {
    setFormData(prevData => ({
      ...prevData,
      ...data
    }))
  }

  const handleUpdateDraft = async () => {
    if (!token || !id) return
    try {
      await letterService.updateDraft(token, id, formData)
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      alert("Failed to update draft")
    }
  }

  const handleUploadToDrive = async () => {
    if (!token || !id) return
    try {
      await letterService.uploadToDrive(token, id, formData)
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      alert("Failed to upload to Drive")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <div className="hidden md:block md:w-64">
            <Sidebar />
          </div>

          <div className="flex-1 bg-white shadow-sm rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Update Letter</h1>

            <div className="flex space-x-4 mb-4">
              <button
                onClick={handleUpdateDraft}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Draft
              </button>
              <button
                onClick={handleUploadToDrive}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Upload to Drive
              </button>
            </div>

            <AdvancedEditor  
              initialValue={formData} 
              onChange={handleEditorChange} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateLetter