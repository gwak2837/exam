'use client'

import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react'
import { type Editor as TinyMCEEditor } from 'tinymce'

type Props = {
  placeholder?: string
}

export default function TinymceEditor({ placeholder }: Props) {
  const editorRef = useRef<TinyMCEEditor | null>(null)

  return (
    <form className="flex flex-1 justify-center" onSubmit={(e) => e.preventDefault()}>
      <Editor
        init={{
          promotion: false,
          placeholder,
          plugins:
            'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap emoticons accordion',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor removeformat | link image media | align lineheight numlist bullist outdent indent | codesample save',
          content_style: 'body::before { white-space: pre-line }',
        }}
        tinymceScriptSrc="/script/tinymce/tinymce.min.js"
        onInit={(_, editor) => (editorRef.current = editor)}
      />
    </form>
  )
}

export function TinymceEditorLoading() {
  return <div className="h-40 w-full animate-pulse rounded-lg bg-white" />
}
