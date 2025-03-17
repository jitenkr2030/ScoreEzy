import { prisma } from "@/lib/prisma"

export interface RubricCriteria {
  id: string
  name: string
  description: string
  points: number
  levels: {
    level: number
    description: string
    pointRange: [number, number]
  }[]
  assignmentId?: string
  rubricId?: string
}

export interface Rubric {
  id: string
  name: string
  description?: string
  criteria: RubricCriteria[]
  totalPoints: number
  courseId: string
  createdAt: Date
  updatedAt: Date
}

export class RubricManager {
  async createRubric(data: Omit<Rubric, 'id' | 'totalPoints' | 'createdAt' | 'updatedAt'>): Promise<Rubric> {
    const totalPoints = data.criteria.reduce((sum, criterion) => sum + criterion.points, 0)

    return {
      id: Math.random().toString(36).substring(7),
      ...data,
      totalPoints,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  async updateRubric(rubricId: string, data: Partial<Omit<Rubric, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Rubric> {
    const existingRubric = await prisma.rubric.findUnique({
      where: { id: rubricId },
      include: { criteria: true }
    })

    if (!existingRubric) {
      throw new Error('Rubric not found')
    }

    const updatedCriteria = (data.criteria || existingRubric.criteria).map(criterion => ({
      ...criterion,
      description: criterion.description || '',
      levels: criterion.levels || []
    })) as RubricCriteria[]

    const totalPoints = updatedCriteria.reduce((sum, criterion) => sum + criterion.points, 0)

    return {
      ...existingRubric,
      ...data,
      courseId: data.courseId || existingRubric.courseId,
      description: existingRubric.description || undefined,
      criteria: updatedCriteria,
      totalPoints,
      updatedAt: new Date()
    }
  }

  async getRubric(rubricId: string): Promise<Rubric | null> {
    const rubric = await prisma.rubric.findUnique({
      where: { id: rubricId },
      include: { criteria: true }
    })

    if (!rubric) return null

    const totalPoints = rubric.criteria.reduce((sum, criterion) => sum + criterion.points, 0)

    return {
      ...rubric,
      courseId: rubric.courseId,
      description: rubric.description || undefined,
      criteria: rubric.criteria.map(criterion => ({
        ...criterion,
        description: criterion.description || '',
        levels: (criterion.levels as any[] || []).map(level => ({
          level: level.level || 0,
          description: level.description || '',
          pointRange: level.pointRange || [0, criterion.points]
        }))
      })) as RubricCriteria[],
      totalPoints
    }
  }

  async listRubrics(courseId: string): Promise<Rubric[]> {
    const rubrics = await prisma.rubric.findMany({
      include: { criteria: true },
      orderBy: { createdAt: 'desc' }
    })

    return rubrics.map(rubric => ({
      ...rubric,
      courseId: rubric.courseId,
      description: rubric.description || undefined,
      criteria: rubric.criteria.map(criterion => ({
        id: criterion.id,
        name: criterion.name,
        description: criterion.description || '',
        points: criterion.points || 0,
        levels: (criterion.levels as any[] || []).map(level => ({
          level: level.level || 0,
          description: level.description || '',
          pointRange: level.pointRange || [0, criterion.points || 0]
        }))
      })) as RubricCriteria[],
      totalPoints: rubric.criteria.reduce((sum: number, criterion: { points: number }) => sum + (criterion.points || 0), 0)
    }))
  }

  async deleteRubric(rubricId: string): Promise<void> {
    await prisma.rubric.delete({
      where: { id: rubricId }
    })
  }

  async validateRubric(rubric: Omit<Rubric, 'id' | 'totalPoints' | 'createdAt' | 'updatedAt'>): Promise<boolean> {
    // Validate basic rubric structure
    if (!rubric.name || !rubric.courseId || !Array.isArray(rubric.criteria)) {
      return false
    }

    // Validate each criterion
    for (const criterion of rubric.criteria) {
      if (!criterion.name || !criterion.points || !Array.isArray(criterion.levels)) {
        return false
      }

      // Validate levels
      for (const level of criterion.levels) {
        if (!level.description || !Array.isArray(level.pointRange) || level.pointRange.length !== 2) {
          return false
        }

        const [min, max] = level.pointRange
        if (typeof min !== 'number' || typeof max !== 'number' || min > max || max > criterion.points) {
          return false
        }
      }
    }

    return true
  }
}