/*
  Warnings:

  - You are about to drop the `bookrent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bookrent` DROP FOREIGN KEY `BookRent_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `bookrent` DROP FOREIGN KEY `BookRent_rentId_fkey`;

-- DropTable
DROP TABLE `bookrent`;

-- CreateIndex
CREATE INDEX `Rent_bookId_idx` ON `Rent`(`bookId`);

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_activeBookId_fkey` FOREIGN KEY (`activeBookId`) REFERENCES `Book`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
