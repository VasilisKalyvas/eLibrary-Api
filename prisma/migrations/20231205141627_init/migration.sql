/*
  Warnings:

  - A unique constraint covering the columns `[activeBookId]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `rent` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `Rent_activeBookId_fkey` ON `Rent`(`activeBookId`);

-- RenameIndex
ALTER TABLE `book` RENAME INDEX `Book_activeRentId_key` TO `Book_activeRentId_fkey`;
