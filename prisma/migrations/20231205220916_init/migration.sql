/*
  Warnings:

  - A unique constraint covering the columns `[activeRentId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Book_activeRentId_key` ON `Book`(`activeRentId`);
