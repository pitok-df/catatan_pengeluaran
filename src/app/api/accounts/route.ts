import { NextResponse } from "next/server";
import { prisma, userSession } from "../config";
import { createResponse } from "../helpers/response";

export async function GET() {
    try {
        const session: any = await userSession()

        const accounts = await prisma.accounts.findMany({
            where: {
                userID: String(session?.user.id)
            }, orderBy: { name: 'asc' }
        });

        return NextResponse.json(
            createResponse("success", 200, "Successfully get data", { accounts }),
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                details: error
            }),
            { status: 500 }
        )
    }
}