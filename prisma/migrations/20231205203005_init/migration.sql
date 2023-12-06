/*
  Warnings:

  - A unique constraint covering the columns `[bookId,status,createdAt]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Rent_bookId_status_key` ON `rent`;

-- CreateIndex
CREATE UNIQUE INDEX `Rent_bookId_status_createdAt_key` ON `Rent`(`bookId`, `status`, `createdAt`);
