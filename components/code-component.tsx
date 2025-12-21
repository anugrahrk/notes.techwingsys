"use client"
import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

export const Codecomponent = ({id,language,code}:{id:string,language:string,code:string}) => {
    const [copied,setCopied]=useState(false)
  return (
   <div key={id} className="relative my-6">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          borderRadius: "8px",
          padding: "16px",
          fontSize: "14px"
        }}
      >
        {code}
      </SyntaxHighlighter>

      {/* Copy button */}
      <button
        onClick={() => {navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(()=>setCopied(false),5000)
        }}
        className="absolute top-2 right-2 text-xs text-white cursor-pointer bg-zinc-800 px-2 py-1 rounded"
      >
       {copied?"Copied!":"Copy"} 
      </button>
    </div>
  )
}
