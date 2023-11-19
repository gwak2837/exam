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
    <form onSubmit={(e) => e.preventDefault()}>
      <Editor
        onInit={(_, editor) => (editorRef.current = editor)}
        tinymceScriptSrc="/script/tinymce/tinymce.min.js"
        init={{
          promotion: false,
          placeholder,
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          content_style: 'body::before { white-space: pre-line }',
        }}
      />
    </form>
  )
}

export function TinymceEditorLoading() {
  return <div className="h-40 w-full animate-pulse rounded-lg bg-white" />
}
