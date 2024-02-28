/*
  Warnings:

  - Added the required column `contentMDX` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "contentMDX" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT;
