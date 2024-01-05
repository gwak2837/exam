/*
  Warnings:

  - Added the required column `ageRange` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ageRange" SMALLINT NOT NULL,
ALTER COLUMN "birthDate" DROP NOT NULL;
