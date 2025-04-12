-- AlterTable
ALTER TABLE `User` MODIFY `authToken` VARCHAR(191) NULL,
    MODIFY `authExprire` DATETIME(3) NULL;
