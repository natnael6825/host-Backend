-- DropForeignKey
ALTER TABLE `Inspection` DROP FOREIGN KEY `Inspection_assignedById_fkey`;

-- DropIndex
DROP INDEX `Inspection_assignedById_fkey` ON `Inspection`;

-- AlterTable
ALTER TABLE `Inspection` MODIFY `assignedById` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_assignedById_fkey` FOREIGN KEY (`assignedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
