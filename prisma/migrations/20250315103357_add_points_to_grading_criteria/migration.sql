-- AlterTable
ALTER TABLE "GradingCriteria" ADD COLUMN     "points" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "rubricId" TEXT;

-- CreateTable
CREATE TABLE "Rubric" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rubric_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GradingCriteria" ADD CONSTRAINT "GradingCriteria_rubricId_fkey" FOREIGN KEY ("rubricId") REFERENCES "Rubric"("id") ON DELETE SET NULL ON UPDATE CASCADE;
