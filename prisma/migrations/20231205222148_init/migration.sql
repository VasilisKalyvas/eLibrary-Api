-- DropForeignKey
ALTER TABLE `activerent` DROP FOREIGN KEY `ActiveRent_bookId_fkey`;

-- DropIndex
DROP INDEX `Book_activeRentId_key` ON `book`;

-- AlterTable
ALTER TABLE `rent` ADD COLUMN `activeRentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ActiveRent` ADD CONSTRAINT `ActiveRent_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
