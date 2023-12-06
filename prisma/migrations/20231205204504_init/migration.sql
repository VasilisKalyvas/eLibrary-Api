/*
  Warnings:

  - A unique constraint covering the columns `[activeBookId]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `activeRentId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Rent_activeBookId_key` ON `Rent`(`activeBookId`);
