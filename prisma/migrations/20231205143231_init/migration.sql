-- RenameIndex
ALTER TABLE `book` RENAME INDEX `Book_activeRentId_fkey` TO `Book_activeRentId_key`;

-- RenameIndex
ALTER TABLE `rent` RENAME INDEX `Rent_bookId_fkey` TO `Rent_bookId_key`;
