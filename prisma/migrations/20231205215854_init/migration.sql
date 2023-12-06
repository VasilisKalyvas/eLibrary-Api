-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_bookId_fkey`;

-- AddForeignKey
ALTER TABLE `Rent` ADD CONSTRAINT `Rent_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `rent` RENAME INDEX `Rent_activeBookId_fkey` TO `Rent_activeBookId_idx`;
