-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
