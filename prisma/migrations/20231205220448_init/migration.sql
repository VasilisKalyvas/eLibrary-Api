-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_activeBookId_fkey`;

-- AlterTable
ALTER TABLE `book` ADD COLUMN `rentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_rentId_fkey` FOREIGN KEY (`rentId`) REFERENCES `Rent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
