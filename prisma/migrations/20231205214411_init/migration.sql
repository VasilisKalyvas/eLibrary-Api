/*
  Warnings:

  - You are about to drop the column `activeBookId` on the `rent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_activeBookId_fkey`;

-- AlterTable
ALTER TABLE `rent` DROP COLUMN `activeBookId`;

-- CreateTable
CREATE TABLE `BookRent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `rentId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookRent` ADD CONSTRAINT `BookRent_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookRent` ADD CONSTRAINT `BookRent_rentId_fkey` FOREIGN KEY (`rentId`) REFERENCES `Rent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
