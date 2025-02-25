import { render, screen, fireEvent } from "@testing-library/react"
import { SubscriptionManagement } from "@/components/subscription-management"
import { SessionProvider } from "next-auth/react"
import jest from "jest" // Added import for jest

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { user: { id: "1", name: "Test User" } },
    status: "authenticated",
  })),
}))

describe("SubscriptionManagement", () => {
  it("renders subscription plans", async () => {
    render(
      <SessionProvider session={null}>
        <SubscriptionManagement />
      </SessionProvider>,
    )

    expect(screen.getByText("Subscription Plans")).toBeInTheDocument()
    expect(await screen.findByText("Basic Plan")).toBeInTheDocument()
    expect(screen.getByText("Standard Plan")).toBeInTheDocument()
    expect(screen.getByText("Premium Plan")).toBeInTheDocument()
  })

  it("allows subscribing to a plan", async () => {
    render(
      <SessionProvider session={null}>
        <SubscriptionManagement />
      </SessionProvider>,
    )

    const subscribeButton = await screen.findByText("Subscribe")
    fireEvent.click(subscribeButton)

    expect(await screen.findByText("Subscription Updated")).toBeInTheDocument()
  })
})

