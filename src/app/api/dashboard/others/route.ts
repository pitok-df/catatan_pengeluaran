;
import { NextResponse } from "next/server";
import { createResponse } from "../../helpers/response";
import { prisma, userSession } from "../../config";

export async function GET() {
    try {
        const session: any = await userSession();
        const categories = await prisma.categories.findMany({ where: { userID: String(session?.user.id) }, include: { transaction: true } })
        const transactions = await prisma.transactions.findMany({ where: { userID: String(session?.user.id) }, include: { category: true, account: true } })
        return NextResponse.json(createResponse("success", 200, "Berhasil mendapatkan data.", { categories, transactions }));
    } catch (error: any) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                details: error.message || error
            }),
            { status: 500 }
        );
    }
}