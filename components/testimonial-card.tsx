import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
}

export function TestimonialCard({ name, role, content }: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{role}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{content}</p>
      </CardContent>
    </Card>
  )
}

