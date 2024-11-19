import { NextRequest, NextResponse } from "next/server";
import { prisma, userSession } from "../config";
import { createResponse } from "../helpers/response";

export async function GET() {
    try {
        const session: any = await userSession();

        if (!session) {
            return NextResponse.json(
                createResponse("failed", 401, "Unauthorized"),
                { status: 401 }
            );
        }

        const accounts = await prisma.accounts.findMany({
            where: {
                userID: String(session?.user.id)
            }, orderBy: { name: 'asc' }
        });

        return NextResponse.json(
            createResponse("success", 200, "Successfully get data", accounts),
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                details: error.message
            }),
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session: any = await userSession();
        if (!session) {
            return NextResponse.json(
                createResponse("failed", 401, "Unauthorized"),
                { status: 401 }
            );
        }

        const { name, balance } = await request.json();
        if (!name || !balance) {
            return NextResponse.json(
                createResponse("failed", 400, "All field request."),
                { status: 400 }
            );
        }

        const newAcount = await prisma.accounts.create({
            data: {
                name: String(name), balance: Number(balance), userID: String(session.user.id)
            }
        });

        return NextResponse.json(
            createResponse("success", 201, "Successfully add payment method.", { newAcount }),
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                details: error
            }),
            { status: 500 }
        )
    }
}