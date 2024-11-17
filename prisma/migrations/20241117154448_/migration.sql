-- CreateEnum
CREATE TYPE "TypeTransaction" AS ENUM ('income', 'expense');

-- CreateTable
CREATE TABLE "users" (
    "userID" TEXT NOT NULL,
    "name" VARCHAR(125) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "categories" (
    "categoryID" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "name" VARCHAR(125) NOT NULL,
    "type" "TypeTransaction" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryID")
);

-- CreateTable
CREATE TABLE "transactions" (
    "transactionID" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "type" "TypeTransaction" NOT NULL DEFAULT 'expense',
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("transactionID")
);

-- CreateTable
CREATE TABLE "accounts" (
    "accountID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "name" VARCHAR(125) NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("accountID")
);

-- CreateTable
CREATE TABLE "reminders" (
    "reminderID" SERIAL NOT NULL,
    "userID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reminderDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reminders_pkey" PRIMARY KEY ("reminderID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("userID") ON DELETE CASCADE ON UPDATE CASCADE;
