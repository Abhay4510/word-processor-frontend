export interface Letter {
  _id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  savedToDrive?: boolean
  driveFileId?: string
}

export interface LetterFormData {
  title: string
  content: string
}

export interface EditorState {
  letters: Letter[]
  currentLetter: Letter | null
  loading: boolean
  error: string | null
}

export interface EditorContextType extends EditorState {
  fetchLetters: () => Promise<void>
  createDraft: (data: LetterFormData) => Promise<Letter>
  updateDraft: (id: string, data: LetterFormData) => Promise<Letter>
  saveToDrive: (id: string, data: LetterFormData) => Promise<Letter>
  setCurrentLetter: (letter: Letter | null) => void
}