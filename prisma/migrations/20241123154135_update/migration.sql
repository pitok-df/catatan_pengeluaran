-- AddForeignKey
ALTER TABLE "transferDana" ADD CONSTRAINT "transferDana_trFrom_fkey" FOREIGN KEY ("trFrom") REFERENCES "accounts"("accountID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transferDana" ADD CONSTRAINT "transferDana_trTo_fkey" FOREIGN KEY ("trTo") REFERENCES "accounts"("accountID") ON DELETE CASCADE ON UPDATE CASCADE;
