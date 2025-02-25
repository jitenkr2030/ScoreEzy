import { prisma } from "@/lib/prisma"
import { Course, User, UserProgress } from "@prisma/client"

interface AnalyticsMetrics {
  totalStudents: number
  averageProgress: number
  completionRate: number
  averageScore: number
  engagementRate: number
}

interface CustomReportConfig {
  type: "course-completion" | "student-grades" | "instructor-effectiveness"
  startDate?: Date
  endDate?: Date
  courseId?: string
  instructorId?: string
}

interface StudentPerformanceData {
  studentId: string
  courseName: string
  progress: number
  grades: number[]
  attendance: number
  participation: number
  lastActive: Date
}

export class AnalyticsService {
  async getCourseAnalytics(courseId: string): Promise<AnalyticsMetrics> {
    const courseData = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        enrollments: {
          include: {
            progress: true,
            submissions: true,
            attendance: true
          }
        }
      }
    })

    if (!courseData || !courseData.enrollments.length) {
      return {
        totalStudents: 0,
        averageProgress: 0,
        completionRate: 0,
        averageScore: 0,
        engagementRate: 0
      }
    }

    const totalStudents = courseData.enrollments.length
    const completedStudents = courseData.enrollments.filter(e => e.progress?.completed).length
    const totalScores = courseData.enrollments.reduce((sum, e) => 
      sum + (e.submissions?.reduce((acc, s) => acc + s.score, 0) || 0), 0)
    const totalAttendance = courseData.enrollments.reduce((sum, e) => 
      sum + (e.attendance?.sessionsAttended || 0), 0)

    return {
      totalStudents,
      averageProgress: courseData.enrollments.reduce((sum, e) => sum + (e.progress?.percentage || 0), 0) / totalStudents,
      completionRate: (completedStudents / totalStudents) * 100,
      averageScore: totalScores / totalStudents,
      engagementRate: (totalAttendance / (totalStudents * courseData.totalSessions)) * 100
    }
  }

  async generateCustomReport(config: CustomReportConfig) {
    switch (config.type) {
      case "course-completion":
        return this.generateCourseCompletionReport(config)
      case "student-grades":
        return this.generateStudentGradesReport(config)
      case "instructor-effectiveness":
        return this.generateInstructorEffectivenessReport(config)
      default:
        throw new Error("Invalid report type")
    }
  }

  async getStudentPerformanceInsights(studentId: string): Promise<StudentPerformanceData[]> {
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId },
      include: {
        course: true,
        progress: true,
        submissions: true,
        attendance: true
      }
    })

    return enrollments.map(enrollment => ({
      studentId,
      courseName: enrollment.course.name,
      progress: enrollment.progress?.percentage || 0,
      grades: enrollment.submissions?.map(s => s.score) || [],
      attendance: (enrollment.attendance?.sessionsAttended || 0) / enrollment.course.totalSessions * 100,
      participation: enrollment.progress?.participationRate || 0,
      lastActive: enrollment.lastAccessedAt || new Date()
    }))
  }

  private async generateCourseCompletionReport(config: CustomReportConfig) {
    const courses = await prisma.course.findMany({
      where: {
        createdAt: {
          gte: config.startDate,
          lte: config.endDate
        }
      },
      include: {
        enrollments: {
          include: {
            progress: true
          }
        }
      }
    })

    return courses.map(course => ({
      courseName: course.name,
      totalStudents: course.enrollments.length,
      completionRate: course.enrollments.reduce((sum, e) => 
        sum + (e.progress?.completed ? 1 : 0), 0) / course.enrollments.length * 100
    }))
  }

  private async generateStudentGradesReport(config: CustomReportConfig) {
    const submissions = await prisma.submission.findMany({
      where: {
        createdAt: {
          gte: config.startDate,
          lte: config.endDate
        },
        enrollment: {
          courseId: config.courseId
        }
      },
      include: {
        enrollment: {
          include: {
            student: true
          }
        }
      }
    })

    return submissions.reduce((acc, submission) => {
      const studentId = submission.enrollment.studentId
      if (!acc[studentId]) {
        acc[studentId] = {
          studentName: submission.enrollment.student.name,
          grades: []
        }
      }
      acc[studentId].grades.push(submission.score)
      return acc
    }, {} as Record<string, { studentName: string; grades: number[] }>)
  }

  private async generateInstructorEffectivenessReport(config: CustomReportConfig) {
    const courses = await prisma.course.findMany({
      where: {
        instructorId: config.instructorId,
        createdAt: {
          gte: config.startDate,
          lte: config.endDate
        }
      },
      include: {
        enrollments: {
          include: {
            progress: true,
            submissions: true,
            feedback: true
          }
        }
      }
    })

    return courses.map(course => ({
      courseName: course.name,
      studentSatisfaction: course.enrollments.reduce((sum, e) => 
        sum + (e.feedback?.rating || 0), 0) / course.enrollments.length,
      averageGrade: course.enrollments.reduce((sum, e) => 
        sum + (e.submissions?.reduce((acc, s) => acc + s.score, 0) || 0), 0) / course.enrollments.length,
      completionRate: course.enrollments.reduce((sum, e) => 
        sum + (e.progress?.completed ? 1 : 0), 0) / course.enrollments.length * 100
    }))
  }
}