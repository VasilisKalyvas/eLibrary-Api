/*
  Warnings:

  - A unique constraint covering the columns `[activeRentId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bookId]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[activeBookId]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `activeRentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `rent` ADD COLUMN `activeBookId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Book_activeRentId_fkey` ON `Book`(`activeRentId`);

-- CreateIndex
CREATE UNIQUE INDEX `Rent_bookId_fkey` ON `Rent`(`bookId`);

-- CreateIndex
CREATE UNIQUE INDEX `Rent_activeBookId_fkey` ON `Rent`(`activeBookId`);

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_activeRentId_fkey` FOREIGN KEY (`activeRentId`) REFERENCES `Rent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
