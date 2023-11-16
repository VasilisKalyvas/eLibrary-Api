/*
  Warnings:

  - You are about to drop the column `userId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_userId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `userId`,
    ADD COLUMN `rentedById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_rentedById_fkey` FOREIGN KEY (`rentedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
