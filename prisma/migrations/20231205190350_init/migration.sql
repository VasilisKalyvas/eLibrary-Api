/*
  Warnings:

  - You are about to drop the column `activeBookId` on the `rent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_activeBookId_fkey`;

-- AlterTable
ALTER TABLE `rent` DROP COLUMN `activeBookId`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_activeRentId_fkey` FOREIGN KEY (`activeRentId`) REFERENCES `Rent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
