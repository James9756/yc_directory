/*
  Warnings:

  - You are about to drop the `View` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pitch" DROP CONSTRAINT "Pitch_viewId_fkey";

-- DropTable
DROP TABLE "View";
