"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Editor from "@monaco-editor/react"

interface InteractiveCodeEditorProps {
  initialCode: string
  language: string
}

export function InteractiveCodeEditor({ initialCode, language }: InteractiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState(language)

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value)
    }
  }

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
  }

  const handleRunCode = () => {
    // In a real implementation, this would send the code to a backend service for execution
    setOutput(`Simulated output for ${selectedLanguage} code:\n${code}`)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Interactive Code Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Editor height="300px" language={selectedLanguage} value={code} onChange={handleEditorChange} theme="vs-dark" />
        <Button onClick={handleRunCode} className="mt-4">
          Run Code
        </Button>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Output:</h3>
          <pre>{output}</pre>
        </div>
      </CardContent>
    </Card>
  )
}

