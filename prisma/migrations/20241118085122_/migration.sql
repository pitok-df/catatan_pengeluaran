-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "categoryID" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "categories"("categoryID") ON DELETE CASCADE ON UPDATE CASCADE;
