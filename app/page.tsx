import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/auth.config"
import { Suspense, lazy } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserLogin } from "./components/user-login"
import { UserRegistration } from "./components/user-registration"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

const LazySubscriptionManagement = lazy(() => import("@/components/subscription-management"))
const LazyCoursePurchase = lazy(() => import("@/components/course-purchase"))
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const featuredCourse = await prisma.course.findFirst({
    include: { instructor: true },
  })

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div
            className="text-center animate-fade-in-down"
          >
            <h1 className="text-5xl font-bold mb-6">Welcome to ScoreEzy</h1>
            <p className="text-xl mb-8">Empowering education through smart learning solutions</p>
            {!session && (
              <div className="space-x-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary">Register Now</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <UserRegistration />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg">Login</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <UserLogin />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ScoreEzy?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img src="/placeholder.svg" alt="AI Learning" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Learning</h3>
              <p className="text-gray-600">Personalized learning paths adapted to your needs</p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img src="/placeholder.svg" alt="Expert Teachers" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Teachers</h3>
              <p className="text-gray-600">Learn from industry professionals</p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105"
            >
              <img src="/placeholder.svg" alt="Interactive Learning" className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Engage with interactive content and live sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="bg-white p-6 rounded-lg shadow-lg animate-slide-in-left"
            >
              <p className="text-gray-600 mb-4">"ScoreEzy has transformed the way I learn. The personalized approach and expert guidance have helped me achieve my goals faster."</p>
              <div className="flex items-center">
                <img src="/placeholder-user.jpg" alt="Student" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-gray-500">Computer Science Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

