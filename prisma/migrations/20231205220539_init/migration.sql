/*
  Warnings:

  - You are about to drop the column `rentId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_rentId_fkey`;

-- DropIndex
DROP INDEX `Rent_activeBookId_idx` ON `rent`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `rentId`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_activeRentId_fkey` FOREIGN KEY (`activeRentId`) REFERENCES `Rent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
