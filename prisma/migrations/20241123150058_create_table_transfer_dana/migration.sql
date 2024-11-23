-- CreateTable
CREATE TABLE "transferDana" (
    "transferID" TEXT NOT NULL,
    "trFrom" TEXT NOT NULL,
    "trTo" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "adminFee" DECIMAL(65,30) NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "transferDana_pkey" PRIMARY KEY ("transferID")
);
