import { prisma } from "@/lib/prisma"

export interface PlagiarismCheckResult {
  id: string
  submissionId: string
  similarityScore: number
  matchedSources: {
    sourceId: string
    similarity: number
    matchedContent: string
  }[]
  checkedAt: Date
}

export class PlagiarismDetector {
  async checkPlagiarism(submissionId: string, content: string): Promise<PlagiarismCheckResult> {
    // Get previous submissions from the database for comparison
    const previousSubmissions = await prisma.submission.findMany({
      where: {
        NOT: {
          id: submissionId
        }
      },
      select: {
        id: true,
        content: true
      }
    })

    // Compare with previous submissions
    const matchedSources = await Promise.all(
      previousSubmissions.map(async (submission) => {
        const similarity = await this.calculateSimilarity(content, submission.content)
        if (similarity > 0.3) { // 30% similarity threshold
          return {
            sourceId: submission.id,
            similarity,
            matchedContent: this.findMatchedContent(content, submission.content)
          }
        }
        return null
      })
    )

    // Filter out null results and sort by similarity
    const validMatches = matchedSources
      .filter((match): match is NonNullable<typeof match> => match !== null)
      .sort((a, b) => b.similarity - a.similarity)

    // Calculate overall similarity score
    const similarityScore = validMatches.length > 0
      ? validMatches.reduce((sum, match) => sum + match.similarity, 0) / validMatches.length
      : 0

    // Save and return the plagiarism check result
    return {
      id: Math.random().toString(36).substring(7),
      submissionId,
      similarityScore,
      matchedSources: validMatches,
      checkedAt: new Date()
    }
  }

  private async calculateSimilarity(text1: string, text2: string): Promise<number> {
    // Implement text similarity algorithm
    // This could use various approaches like:
    // - Cosine similarity with TF-IDF
    // - Levenshtein distance
    // - N-gram comparison
    // For now, using a simple implementation
    const words1 = new Set(text1.toLowerCase().split(/\s+/))
    const words2 = new Set(text2.toLowerCase().split(/\s+/))
    
    const intersection = new Set([...words1].filter(x => words2.has(x)))
    const union = new Set([...words1, ...words2])
    
    return intersection.size / union.size
  }

  private findMatchedContent(text1: string, text2: string): string {
    // Implement algorithm to find matching content segments
    // This could use techniques like:
    // - Longest common substring
    // - Sequence alignment
    // For now, returning a simplified match
    const words1 = text1.split(/\s+/)
    const words2 = text2.split(/\s+/)
    let longestMatch = ''

    for (let i = 0; i < words1.length; i++) {
      for (let j = 0; j < words2.length; j++) {
        let match = ''
        let k = 0
        while (i + k < words1.length && j + k < words2.length && 
               words1[i + k] === words2[j + k]) {
          match += words1[i + k] + ' '
          k++
        }
        if (match.length > longestMatch.length) {
          longestMatch = match.trim()
        }
      }
    }

    return longestMatch
  }
}