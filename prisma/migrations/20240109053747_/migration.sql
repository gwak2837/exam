/*
  Warnings:

  - You are about to drop the column `profileImageURL` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageURLs" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileImageURL",
ADD COLUMN     "profileImageURLs" TEXT[];
