/*
  Warnings:

  - Added the required column `userID` to the `transferDana` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transferDana" ADD COLUMN     "userID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transferDana" ADD CONSTRAINT "transferDana_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
