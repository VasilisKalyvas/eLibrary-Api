-- DropIndex
DROP INDEX `Book_activeRentId_fkey` ON `book`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_activeRentId_fkey` FOREIGN KEY (`activeRentId`) REFERENCES `Rent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
