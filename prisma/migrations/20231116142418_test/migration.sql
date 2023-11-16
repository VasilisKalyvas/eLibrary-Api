/*
  Warnings:

  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_rentedById_fkey`;

-- DropForeignKey
ALTER TABLE `penalty` DROP FOREIGN KEY `Penalty_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `rent` DROP FOREIGN KEY `Rent_bookId_fkey`;

-- DropTable
DROP TABLE `book`;
