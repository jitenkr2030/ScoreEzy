-- AlterTable
ALTER TABLE "GradingCriteria" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "levels" JSONB NOT NULL DEFAULT '[]';
