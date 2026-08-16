"use client"

import React from 'react'
import dynamic from 'next/dynamic'
const MdViewer = dynamic(()=> import("@uiw/react-md-editor").then((mod)=>mod.default.Markdown),
{ssr:false})
export default function MarkdownPreview({source}:{source:string}) {
  return (
    <div>
      <MdViewer source={source}/>
    </div>
  )
}
