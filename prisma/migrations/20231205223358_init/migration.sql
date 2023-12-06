/*
  Warnings:

  - You are about to drop the column `activeRentId` on the `rent` table. All the data in the column will be lost.
  - You are about to drop the `activerent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `activerent` DROP FOREIGN KEY `ActiveRent_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `activerent` DROP FOREIGN KEY `ActiveRent_userId_fkey`;

-- AlterTable
ALTER TABLE `rent` DROP COLUMN `activeRentId`;

-- DropTable
DROP TABLE `activerent`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_activeRentId_fkey` FOREIGN KEY (`activeRentId`) REFERENCES `Rent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
