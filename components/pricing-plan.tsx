import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface PricingPlanProps {
  name: string
  price: number | string
  features: string[]
}

export function PricingPlan({ name, price, features }: PricingPlanProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{typeof price === "number" ? `$${price.toFixed(2)}/month` : price}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Choose Plan</Button>
      </CardFooter>
    </Card>
  )
}

