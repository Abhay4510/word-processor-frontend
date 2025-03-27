import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { letterService } from "../services/letterService"
import type { LetterFormData } from "../types/letter"
import TextEditor from "../components/Editor/TextEditor"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"

const UpdateLetter = () => {
  const { token } = useAuth()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LetterFormData>({
    title: "",
    content: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  const [savedToDrive, setSavedToDrive] = useState(false)

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

        setSavedToDrive(fetchedLetter.savedToDrive || false)
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
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }))
  }

  const handleUpdateDraft = async () => {
    if (!token || !id) return
    try {
      setIsSaving(true)
      setSaveStatus("Updating draft...")
      await letterService.updateDraft(token, id, formData)
      setSaveStatus("Draft updated successfully!")
      setTimeout(() => {
        navigate("/dashboard")
      }, 1500)
    } catch (error) {
      console.error(error)
      setSaveStatus("Failed to update draft")
    } finally {
      setIsSaving(false)
    }
  }

  const handleUploadToDrive = async () => {
    if (!token || !id) return
    try {
      setIsSaving(true)
      setSaveStatus("Uploading to Google Drive...")
      await letterService.uploadToDrive(token, id, formData)
      setSaveStatus("Uploaded to Google Drive successfully!")
      setTimeout(() => {
        navigate("/dashboard")
      }, 1500)
    } catch (error) {
      console.error(error)
      setSaveStatus("Failed to upload to Google Drive")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-500 bg-red-50 p-6 rounded-lg shadow-md">
          {error}
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md block mx-auto"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64">
            <Sidebar />
          </div>

          <div className="flex-1 bg-white shadow-sm rounded-lg p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-4">Update Letter</h1>

            {saveStatus && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  saveStatus.includes("Failed")
                    ? "bg-red-100 text-red-700"
                    : saveStatus.includes("success")
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {saveStatus}
              </div>
            )}

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
              <button
                onClick={handleUpdateDraft}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving && saveStatus?.includes("Updating") ? "Updating..." : "Update Draft"}
              </button>
              {!savedToDrive && (
                <button
                  onClick={handleUploadToDrive}
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSaving && saveStatus?.includes("Uploading") ? "Uploading..." : "Upload to Drive"}
                </button>
              )}
            </div>

            <TextEditor initialValue={formData} onChange={handleEditorChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateLetter