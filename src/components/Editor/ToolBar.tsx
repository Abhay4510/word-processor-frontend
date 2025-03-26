import { useLetters } from "../../hooks/useLetters"
import type { LetterFormData } from "../../types/letter"
import { useNavigate } from "react-router-dom"

interface ToolBarProps {
  formData: LetterFormData
  draftId?: string
}

const ToolBar = ({ formData, draftId }: ToolBarProps) => {
  const { createDraft, updateDraft, saveToDrive, currentLetter } = useLetters()
  const navigate = useNavigate()

  const handleSaveDraft = async () => {
    try {
      if (draftId) {
        await updateDraft(draftId, formData)
      } else {
        await createDraft(formData)
      }
      alert("Draft saved successfully!")
      navigate("/dashboard")
    } catch (error) {
      alert("Failed to save draft")
      console.error(error)
    }
  }

  const handleSaveToDrive = async () => {
    try {
      if (!draftId) {
        alert("Please save your draft first before uploading to Google Drive.")
        return
      }
      await saveToDrive(draftId, formData)
      alert("Letter saved to Google Drive successfully!")
      navigate("/dashboard")
    } catch (error) {
      alert("Failed to save to Google Drive")
      console.error(error)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={handleSaveDraft}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {draftId ? "Update Draft" : "Save Draft"}
        </button>
        {!currentLetter?.savedToDrive && (
          <button
            onClick={handleSaveToDrive}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save to Google Drive
          </button>
        )}
      </div>
    </div>
  )
}

export default ToolBar