import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode
} from "react"
import type { EditorContextType, EditorState, Letter, LetterFormData } from "../types/letter"
import { letterService } from "../services/letterService"
import { AuthContext } from "./AuthContext"

const initialState: EditorState = {
  letters: [],
  currentLetter: null,
  loading: false,
  error: null,
}

export const EditorContext = createContext<EditorContextType>({
  ...initialState,
  fetchLetters: async () => {},
  createDraft: async () => ({ _id: "", title: "", content: "", createdAt: "", updatedAt: "" }),
  updateDraft: async () => ({ _id: "", title: "", content: "", createdAt: "", updatedAt: "" }),
  saveToDrive: async () => ({ _id: "", title: "", content: "", createdAt: "", updatedAt: "" }),
  setCurrentLetter: () => {},
})

interface EditorProviderProps {
  children: ReactNode
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [state, setState] = useState<EditorState>(initialState)
  const { token } = useContext(AuthContext)

  const fetchLetters = useCallback(async () => {
    if (!token) return
    setState((prev) => ({ ...prev, loading: true }))
    try {
      const letters = await letterService.getLetters(token)
      setState((prev) => ({
        ...prev,
        letters,
        loading: false,
        error: null,
      }))
    } catch {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to fetch letters",
      }))
    }
  }, [token])

  const createDraft = async (data: LetterFormData) => {
    if (!token) throw new Error("Not authenticated")
    setState((prev) => ({ ...prev, loading: true }))
    try {
      const response = await letterService.createDraft(token, data)
      setState((prev) => ({
        ...prev,
        letters: [...prev.letters, response.draft],
        currentLetter: response.draft,
        loading: false,
        error: null,
      }))
      return response.draft
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to create draft",
      }))
      throw error
    }
  }

  const updateDraft = async (id: string, data: LetterFormData) => {
    if (!token) throw new Error("Not authenticated")
    setState((prev) => ({ ...prev, loading: true }))
    try {
      const updatedLetter = await letterService.updateDraft(token, id, data)
      setState((prev) => ({
        ...prev,
        letters: prev.letters.map((l) => (l._id === id ? updatedLetter : l)),
        currentLetter: updatedLetter,
        loading: false,
        error: null,
      }))
      return updatedLetter
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to update draft",
      }))
      throw error
    }
  }

  const saveToDrive = async (id: string, data: LetterFormData) => {
    if (!token) throw new Error("Not authenticated")
    setState((prev) => ({ ...prev, loading: true }))
    try {
      const newLetter = await letterService.saveToDrive(token, data)
      setState((prev) => ({
        ...prev,
        letters: [
          ...prev.letters.filter((l) => l._id !== newLetter._id),
          newLetter,
        ],
        currentLetter: newLetter,
        loading: false,
        error: null,
      }))
      return newLetter
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to save to Google Drive",
      }))
      throw error
    }
  }

  const setCurrentLetter = useCallback((letter: Letter | null) => {
    setState((prev) => ({
      ...prev,
      currentLetter: letter,
    }))
  }, [])

  return (
    <EditorContext.Provider
      value={{
        ...state,
        fetchLetters,
        createDraft,
        updateDraft,
        saveToDrive,
        setCurrentLetter,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}