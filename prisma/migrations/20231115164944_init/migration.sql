-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_rentedByUserId_fkey`;

-- AlterTable
ALTER TABLE `book` MODIFY `rentedByUserId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_rentedByUserId_fkey` FOREIGN KEY (`rentedByUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
