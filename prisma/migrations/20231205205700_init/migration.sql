-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_activeRentId_fkey`;

-- DropIndex
DROP INDEX `Rent_activeBookId_key` ON `rent`;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_activeBookId_fkey` FOREIGN KEY (`activeBookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
