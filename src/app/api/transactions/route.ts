import { NextRequest, NextResponse } from "next/server";
import { prisma, userSession } from "../config";
import { createResponse } from "../helpers/response";
import { $Enums } from "@prisma/client";

export async function GET() {
    try {
        const session: any = await userSession();

        if (!session) {
            return NextResponse.json(
                createResponse("failed", 401, "Unauthorized"),
                { status: 401 }
            );
        }
        const transactions = await prisma.transactions.findMany({
            where: { userID: String(session.user.id) },
            include: { account: true },
            orderBy: { transactionID: "desc" }
        });

        if (!transactions) {
            return NextResponse.json(
                createResponse("failed", 404, "Transaksion not found"),
                { status: 404 }
            );
        }

        const data = transactions.map((item) => ({
            transactionID: item.transactionID,
            amount: item.amount,
            created_at: item.created_at,
            description: item.description,
            type: item.type,
            paymentMethod: item.account.name
        }));

        return NextResponse.json(
            createResponse("success", 200, "Successfully get data.", data),
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                details: error.message || error
            }),
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    try {
        const session: any = await userSession();
        const { accountID, amount, categoryID, description, type } = await request.json();
        if (!accountID || !amount || !categoryID || !description || !type) {
            return NextResponse.json(
                createResponse("failed", 400, "All fields are required and must be valid.", { accountID, amount, categoryID, description, type }),
                { status: 400 }
            );
        }

        const balanceUpdate = type === "expense" ?
            { decrement: Number(amount) } :
            { increment: Number(amount) };

        const newTransaction = await prisma.$transaction([
            prisma.transactions.create({
                data: {
                    accountID: String(accountID),
                    amount: Number(amount),
                    categoryID: Number(categoryID),
                    description: String(description),
                    type: String(type) as $Enums.TypeTransaction,
                    userID: String(session?.user.id),
                }
            }),
            prisma.accounts.update({
                where: {
                    accountID: String(accountID)
                }, data: {
                    balance: balanceUpdate
                }
            })
        ]);

        return NextResponse.json(
            createResponse("success", 201, "Successfully add transaction.", newTransaction),
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                details: error.message || error
            }),
            { status: 500 }
        );
    }
}