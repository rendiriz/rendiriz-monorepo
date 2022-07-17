/*
  Warnings:

  - You are about to alter the column `total` on the `post_most_view` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "post_most_view" ALTER COLUMN "total" SET DATA TYPE INTEGER;
