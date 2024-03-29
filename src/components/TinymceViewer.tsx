'use client'

import { Editor } from '@tinymce/tinymce-react'

interface Props {
  initialValue: string
}

export default function TinymceViewer({ initialValue }: Props) {
  return (
    <Editor
      disabled
      init={{ menubar: false, statusbar: false, toolbar: false }}
      initialValue={initialValue}
      tinymceScriptSrc="/script/tinymce/tinymce.min.js"
    />
  )
}

export function TinymceViewerLoading() {
  return <div className="h-40 w-full animate-pulse rounded-lg bg-white" />
}
