/*
  Warnings:

  - You are about to drop the column `activeRentId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `activeBookId` on the `rent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_activeBookId_fkey`;

-- DropIndex
DROP INDEX `Book_activeRentId_key` ON `book`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `activeRentId`;

-- AlterTable
ALTER TABLE `rent` DROP COLUMN `activeBookId`;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `activeBookId` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
