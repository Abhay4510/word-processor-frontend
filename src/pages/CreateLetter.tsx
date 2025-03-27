import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { letterService } from "../services/letterService"
import type { LetterFormData } from "../types/letter"
import TextEditor from "../components/Editor/TextEditor"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"

const CreateLetter = () => {
  const { token } = useAuth()
  const [formData, setFormData] = useState<LetterFormData>({ title: "", content: "" })
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)

  const handleEditorChange = (data: LetterFormData) => {
    setFormData(data)
  }

  const handleSaveDraft = async () => {
    if (!token) return
    try {
      setIsSaving(true)
      setSaveStatus("Saving draft...")
      await letterService.createDraft(token, formData)
      setSaveStatus("Draft saved successfully!")
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } catch (error) {
      console.error(error)
      setSaveStatus("Failed to save draft")
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveToDrive = async () => {
    if (!token) return
    try {
      setIsSaving(true)
      setSaveStatus("Saving to Google Drive...")
      await letterService.saveToDrive(token, formData)
      setSaveStatus("Saved to Google Drive successfully!")
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } catch (error) {
      console.error(error)
      setSaveStatus("Failed to save to Google Drive")
    } finally {
      setIsSaving(false)
    }
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
            <h1 className="text-2xl font-bold mb-4">Create New Letter</h1>

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
                onClick={handleSaveDraft}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving && saveStatus?.includes("draft") ? "Saving..." : "Save Draft"}
              </button>
              <button
                onClick={handleSaveToDrive}
                disabled={isSaving}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving && saveStatus?.includes("Drive") ? "Saving..." : "Save to Drive"}
              </button>
            </div>

            <TextEditor initialValue={formData} onChange={handleEditorChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateLetter