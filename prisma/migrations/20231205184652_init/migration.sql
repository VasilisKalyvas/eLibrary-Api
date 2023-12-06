/*
  Warnings:

  - A unique constraint covering the columns `[activeBookId]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_activeRentId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Rent_activeBookId_key` ON `Rent`(`activeBookId`);

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_activeBookId_fkey` FOREIGN KEY (`activeBookId`) REFERENCES `Book`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
