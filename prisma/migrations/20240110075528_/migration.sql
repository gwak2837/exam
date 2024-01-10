/*
  Warnings:

  - You are about to drop the `_UserFollow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFollow" DROP CONSTRAINT "_UserFollow_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFollow" DROP CONSTRAINT "_UserFollow_B_fkey";

-- DropTable
DROP TABLE "_UserFollow";

-- CreateTable
CREATE TABLE "UserFollow" (
    "leaderId" UUID NOT NULL,
    "followerId" UUID NOT NULL,

    CONSTRAINT "UserFollow_pkey" PRIMARY KEY ("leaderId","followerId")
);

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
