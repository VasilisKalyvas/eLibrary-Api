/*
  Warnings:

  - A unique constraint covering the columns `[bookId,status]` on the table `Rent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Rent_bookId_status_key` ON `Rent`(`bookId`, `status`);
