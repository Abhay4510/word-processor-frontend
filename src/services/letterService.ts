import { api } from "../utils/api"
import type { Letter, LetterFormData } from "../types/letter"

interface CreateDraftResponse {
  message: string
  draft: Letter
}

export const letterService = {
  getLetters: async (token: string): Promise<Letter[]> => {
    return api.get("/api/letters", token)
  },

  getLetter: async (token: string, id: string): Promise<Letter> => {
    return api.get(`/api/letters/${id}`, token)
  },

  createDraft: async (token: string, data: LetterFormData): Promise<CreateDraftResponse> => {
    return api.post("/api/letters/draft", token, data)
  },

  saveToDrive: async (token: string, data: LetterFormData): Promise<Letter> => {
    return api.post("/api/letters/saveToDrive", token, data)
  },

  updateDraft: async (token: string, id: string, data: LetterFormData): Promise<Letter> => {
    return api.put(`/api/letters/updated/${id}`, token, data)
  },

  uploadToDrive: async (token: string, id: string, data: LetterFormData): Promise<Letter> => {
    return api.put(`/api/letters/uplodetodrive/${id}`, token, data)
  },
}