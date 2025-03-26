import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Layout/Header"
import Sidebar from "../components/Layout/Sidebar"
import TextEditor from "../components/Editor/TextEditor"
import ToolBar from "../components/Editor/ToolBar"
import { useLetters } from "../hooks/useLetters"
import type { LetterFormData } from "../types/letter"
import { letterService } from "../services/letterService"
import { useAuth } from "../hooks/useAuth"

const Editor = () => {
  const { id } = useParams<{ id?: string }>()
  const { token } = useAuth()
  const { letters, setCurrentLetter, currentLetter, fetchLetters } = useLetters()
  const [formData, setFormData] = useState<LetterFormData>({
    title: "",
    content: "",
  })

  useEffect(() => {
    if (!token) return

    const fetchSingleLetter = async (letterId: string) => {
      try {
        const letter = await letterService.getLetter(token, letterId)
        setCurrentLetter(letter)
        setFormData({ title: letter.title, content: letter.content })
      } catch (error) {
        console.error("Failed to fetch letter:", error)
      }
    }

    if (id) {
      void fetchSingleLetter(id)
    } else {
      setCurrentLetter(null)
      setFormData({ title: "", content: "" })
    }
  }, [id, token, setCurrentLetter])

  useEffect(() => {
    if (token && letters.length === 0) {
      void fetchLetters()
    }
  }, [token, letters.length, fetchLetters])

  const handleEditorChange = (data: LetterFormData) => {
    setFormData(data)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <div className="hidden md:block md:w-64">
            <Sidebar />
          </div>

          <div className="flex-1">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {id ? "Edit Letter" : "Create New Letter"}
              </h1>
              <ToolBar formData={formData} draftId={id} />
              <TextEditor initialValue={formData} onChange={handleEditorChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor