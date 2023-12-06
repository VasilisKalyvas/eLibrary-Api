/*
  Warnings:

  - Added the required column `activeBookId` to the `Rent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rent` ADD COLUMN `activeBookId` INTEGER NOT NULL;
