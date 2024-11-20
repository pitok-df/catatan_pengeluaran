import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../config";
import { createResponse } from "../../helpers/response";

export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.pathname.split('/').pop();
        const account = await prisma.accounts.findFirst({
            where: {
                accountID: String(query)
            }
        });

        return NextResponse.json(
            createResponse("success", 200, "Successfully get data", { account }),
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

export async function DELETE(request: NextRequest) {
    try {
        const query = request.nextUrl.pathname.split("/").pop();
        console.log(query);

        const deletedPayment = await prisma.accounts.delete({ where: { accountID: String(query) } });
        if (!deletedPayment) {
            return NextResponse.json(
                createResponse("success", 400, "failed delete payment method",),
                { status: 400 }
            )
        }

        return NextResponse.json(
            createResponse("success", 200, "Successfully delete payment " + deletedPayment.name),
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