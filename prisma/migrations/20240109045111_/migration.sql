/*
  Warnings:

  - You are about to drop the column `notBefore` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "notBefore",
ADD COLUMN     "publishAt" TIMESTAMP(3);
