'use client'

import { Editor } from '@tinymce/tinymce-react'

export default function TinymceEditor() {
  return (
    <Editor
      tinymceScriptSrc="/script/tinymce/tinymce.min.js"
      init={{
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue="Welcome to TinyMCE!"
    />
  )
}
