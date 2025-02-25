import { InteractiveCodeEditor } from "@/components/interactive-code-editor"

export default function InteractiveLessonPage({ params }: { params: { courseId: string } }) {
  const initialCode = `function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("ScoreEzy User"));`

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Interactive Lesson: Introduction to Functions</h1>
      <p className="mb-4">In this lesson, we'll learn about JavaScript functions. Try running the code below:</p>
      <InteractiveCodeEditor initialCode={initialCode} language="javascript" />
    </div>
  )
}

