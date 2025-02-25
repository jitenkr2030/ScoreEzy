import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is ScoreEzy?</AccordionTrigger>
        <AccordionContent>
          ScoreEzy is an AI-driven learning platform that provides personalized education and seamless collaboration for
          students, instructors, and parents.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does the personalized learning work?</AccordionTrigger>
        <AccordionContent>
          Our AI algorithms analyze your learning style, progress, and goals to create tailored study plans and
          recommend courses that best suit your needs.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I interact with instructors in real-time?</AccordionTrigger>
        <AccordionContent>
          Yes, ScoreEzy offers interactive virtual classrooms where you can engage with instructors and peers through
          live streaming, chat, and collaborative tools.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>How can parents track their child's progress?</AccordionTrigger>
        <AccordionContent>
          Parents have access to a dedicated dashboard where they can monitor their child's learning progress, view
          detailed analytics, and communicate with instructors.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

