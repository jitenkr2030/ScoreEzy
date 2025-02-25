import { prisma } from "@/lib/prisma"

export interface CourseVersion {
  id: string
  courseId: string
  version: string
  changes: string
  status: "draft" | "published" | "archived"
  createdAt: Date
  updatedAt: Date
}

export interface CourseMarketplace {
  id: string
  courseId: string
  price: number
  currency: string
  isPublished: boolean
  enrollmentCount: number
  rating: number
  reviews: CourseReview[]
}

export interface CourseReview {
  id: string
  courseId: string
  userId: string
  rating: number
  comment: string
  createdAt: Date
}

export class CourseManagementService {
  async createCourseVersion(courseId: string, changes: string): Promise<CourseVersion> {
    const currentVersion = await prisma.courseVersion.findFirst({
      where: { courseId },
      orderBy: { createdAt: 'desc' }
    })

    const newVersionNumber = currentVersion
      ? (parseFloat(currentVersion.version) + 0.1).toFixed(1)
      : '1.0'

    return await prisma.courseVersion.create({
      data: {
        courseId,
        version: newVersionNumber,
        changes,
        status: 'draft'
      }
    })
  }

  async publishCourseVersion(versionId: string): Promise<CourseVersion> {
    return await prisma.courseVersion.update({
      where: { id: versionId },
      data: { status: 'published' }
    })
  }

  async listCourseVersions(courseId: string): Promise<CourseVersion[]> {
    return await prisma.courseVersion.findMany({
      where: { courseId },
      orderBy: { createdAt: 'desc' }
    })
  }

  async publishToMarketplace(courseId: string, price: number): Promise<CourseMarketplace> {
    return await prisma.courseMarketplace.create({
      data: {
        courseId,
        price,
        currency: 'USD',
        isPublished: true,
        enrollmentCount: 0,
        rating: 0
      }
    })
  }

  async updateMarketplaceListing(courseId: string, data: Partial<CourseMarketplace>): Promise<CourseMarketplace> {
    return await prisma.courseMarketplace.update({
      where: { courseId },
      data
    })
  }

  async addCourseReview(courseId: string, userId: string, rating: number, comment: string): Promise<CourseReview> {
    return await prisma.courseReview.create({
      data: {
        courseId,
        userId,
        rating,
        comment
      }
    })
  }

  async getCourseMarketplaceStats(courseId: string): Promise<CourseMarketplace> {
    return await prisma.courseMarketplace.findUnique({
      where: { courseId },
      include: { reviews: true }
    })
  }
}