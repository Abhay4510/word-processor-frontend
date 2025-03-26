import React, { useCallback, useRef, useMemo } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import type { LetterFormData } from "../../types/letter"

interface TextEditorProps {
  initialValue: LetterFormData
  onChange: (data: LetterFormData) => void
  readOnly?: boolean
}

const TextEditor = ({ initialValue, onChange, readOnly = false }: TextEditorProps) => {
  const titleRef = useRef(initialValue.title)
  const contentRef = useRef(initialValue.content)

  const handleChange = useCallback(() => {
    onChange({ 
      title: titleRef.current, 
      content: contentRef.current 
    })
  }, [onChange])

  const modules = useMemo(() => ({
    toolbar: readOnly
      ? false
      : [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link"],
          ["clean"],
        ],
  }), [readOnly])

  return (
    <div className="w-full">
      <input
        type="text"
        defaultValue={initialValue.title}
        onChange={(e) => {
          titleRef.current = e.target.value
          handleChange()
        }}
        placeholder="Enter title..."
        className="w-full px-4 py-2 mb-4 text-xl font-bold border border-gray-300 rounded-lg"
        readOnly={readOnly}
      />
      <ReactQuill
        theme="snow"
        defaultValue={initialValue.content}
        onChange={(value) => {
          contentRef.current = value
          handleChange()
        }}
        modules={modules}
        readOnly={readOnly}
        className="bg-white rounded-lg min-h-[300px]"
      />
    </div>
  )
}

export default React.memo(TextEditor)