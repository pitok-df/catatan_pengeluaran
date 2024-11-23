import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../helpers/response";
import { prisma, userSession } from "../config";

export async function POST(request: NextRequest) {
    try {
        const session: any = await userSession();

        if (!session) {
            return NextResponse.json(
                createResponse("failed", 401, "unauthorized.")
                , { status: 401 });
        }

        const { trFrom, trTo, amount, adminFee, desc } = await request.json();
        if (!trFrom || !trTo || !amount || !adminFee || !desc) {
            return NextResponse.json(createResponse("failed", 400, "Fill all field required"), { status: 400 })
        }

        const newTransferDana = await prisma.$transaction([
            prisma.transferDana.create({
                data: {
                    userID: String(session?.user.id),
                    amount: Number(amount),
                    adminFee: Number(adminFee),
                    trFrom: trFrom,
                    trTo: trTo,
                    desc: desc
                }
            }),
            prisma.accounts.update({
                where: { userID: String(session?.user.id), accountID: String(trFrom) },
                data: { balance: { decrement: Number(amount) } }, include: { fromTransfer: true }
            }),
            prisma.accounts.update({
                where: { userID: String(session?.user.id), accountID: String(trTo) },
                data: { balance: { increment: Number(amount) - Number(adminFee) } }, include: { toTransfer: true }
            })
        ]);

        return NextResponse.json(
            createResponse("success", 201, "Successfully transfer dana")
            , { status: 201 }
        )
    } catch (error: any) {
        return NextResponse.json(
            createResponse("success", 500, "Internal server error", null, error.message)
            , { status: 500 }
        )
    }
}


export async function GET() {
    try {
        const session: any = await userSession();

        if (!session) {
            return NextResponse.json(
                createResponse("failed", 401, "unauthorized.")
                , { status: 401 });
        }

        const allTransferDana = await prisma.transferDana.findMany({
            where: {
                userID: String(session?.user.id)
            }, include: { trFroms: true, trTos: true }
        })

        return NextResponse.json(
            createResponse("success", 200, "successfully get data.", allTransferDana), { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, error.message)
            , { status: 500 }
        )
    }
}