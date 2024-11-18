/*
  Warnings:

  - Added the required column `accountID` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "accountID" TEXT NOT NULL,
ALTER COLUMN "categoryID" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountID_fkey" FOREIGN KEY ("accountID") REFERENCES "accounts"("accountID") ON DELETE CASCADE ON UPDATE CASCADE;
