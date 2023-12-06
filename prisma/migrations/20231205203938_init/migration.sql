/*
  Warnings:

  - You are about to drop the column `activeRentId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_activeRentId_fkey`;

-- DropIndex
DROP INDEX `Rent_bookId_status_createdAt_key` ON `rent`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `activeRentId`;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_activeBookId_fkey` FOREIGN KEY (`activeBookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
