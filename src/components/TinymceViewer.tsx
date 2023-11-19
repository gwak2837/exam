'use client'

import { Editor } from '@tinymce/tinymce-react'

type Props = {
  initialValue: string
}

export default function TinymceViewer({ initialValue }: Props) {
  return (
    <Editor
      disabled
      tinymceScriptSrc="/script/tinymce/tinymce.min.js"
      init={{ menubar: false, statusbar: false, toolbar: false }}
      initialValue={initialValue}
    />
  )
}

export function TinymceViewerLoading() {
  return <div className="h-40 w-full animate-pulse rounded-lg bg-white" />
}
