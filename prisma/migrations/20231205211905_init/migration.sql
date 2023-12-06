-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_bookId_fkey`;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `bookId` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
