/*
  Warnings:

  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "level" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];
