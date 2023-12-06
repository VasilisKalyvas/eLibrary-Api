-- DropIndex
DROP INDEX `Rent_activeBookId_fkey` ON `rent`;

-- RenameIndex
ALTER TABLE `book` RENAME INDEX `Book_activeRentId_fkey` TO `Book_activeRentId_key`;
