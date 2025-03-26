import { useContext } from "react"
import { EditorContext } from "../context/EditorContext"

export const useLetters = () => {
  return useContext(EditorContext)
}