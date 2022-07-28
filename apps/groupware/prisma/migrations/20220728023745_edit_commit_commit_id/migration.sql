/*
  Warnings:

  - Added the required column `commitId` to the `Commit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commit" ADD COLUMN     "commitId" TEXT NOT NULL;
