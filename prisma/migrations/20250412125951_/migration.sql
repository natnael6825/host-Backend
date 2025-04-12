-- AlterTable
ALTER TABLE `Inspection` ADD COLUMN `assignToId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `InspectionResponse` MODIFY `mediaUrl` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_assignToId_fkey` FOREIGN KEY (`assignToId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
