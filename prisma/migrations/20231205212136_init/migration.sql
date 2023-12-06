-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `activeBookId`;

-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `bookId`;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_activeBookId_fkey` FOREIGN KEY (`activeBookId`) REFERENCES `Book`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
