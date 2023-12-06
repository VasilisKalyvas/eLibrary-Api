/*
  Warnings:

  - A unique constraint covering the columns `[activeRentId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_activeBookId_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `Book_activeRentId_key` ON `Book`(`activeRentId`);

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_activeRentId_fkey` FOREIGN KEY (`activeRentId`) REFERENCES `Rent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
