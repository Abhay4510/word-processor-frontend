import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { letterService } from "../services/letterService"
import { LetterFormData } from "../types/letter"
import TextEditor from "../components/Editor/TextEditor"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"

const CreateLetter = () => {
  const { token } = useAuth()
  const [formData, setFormData] = useState<LetterFormData>({ title: "", content: "" })

  const handleEditorChange = (data: LetterFormData) => {
    setFormData(data)
  }

  const handleSaveDraft = async () => {
    if (!token) return
    try {
      await letterService.createDraft(token, formData)
      window.location.href = "/dashboard"
    } catch (error) {
      console.error(error)
      alert("Failed to save draft")
    }
  }

  const handleSaveToDrive = async () => {
    if (!token) return
    try {
      await letterService.saveToDrive(token, formData)
      window.location.href = "/dashboard"
    } catch (error) {
      console.error(error)
      alert("Failed to save letter to Drive")
    }
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
            <h1 className="text-2xl font-bold mb-4">Create New Letter</h1>

            <div className="flex space-x-4 mb-4">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Draft
              </button>
              <button
                onClick={handleSaveToDrive}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save to Drive
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