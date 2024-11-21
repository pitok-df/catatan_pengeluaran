import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../helpers/response";
import { prisma, userSession } from "../config";
import { $Enums } from "@prisma/client";

export async function GET() {
    const session: any = await userSession();
    try {
        if (!session) {
            return NextResponse.json(
                createResponse("failed", 401, "unauthorized.")
                , { status: 401 });
        }

        console.log(session?.user.id);


        const categories = await prisma.categories.findMany({
            where: {
                userID: String(session?.user.id)
            },
            include: {
                transaction: {
                    include: { account: true }
                }
            }, orderBy: { categoryID: "asc" }
        });
        const custom = {
            categories: categories.map((category) => {
                return {
                    categoryID: category.categoryID,
                    name: category.name,
                    type: category.type,
                    totalExpenses: category.transaction.filter((tr) => Number(tr.amount) > 0)
                        .reduce((total, tr) => total + Number(tr.amount), 0),
                    accountUse: [...new Set(category.transaction
                        .map((tr) => { return tr.account.name }))]
                        .join(", ")
                }
            })
        }
        return NextResponse.json(
            createResponse("success", 200, "successfully get data", {
                custom
            })
            , { status: 200 });
    } catch (error) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                datails: error
            })
            , { status: 500 });
    }
}
export async function POST(request: NextRequest) {
    try {
        const session: any = await userSession();
        const body = await request.json();

        if (!body.name || !body.type) {
            return NextResponse.json(
                createResponse("failed", 400, "All field required",)
                ,
                { status: 400 })
        }

        const type: $Enums.TypeTransaction = body.type;
        const newCategory = await prisma.categories.create({
            data: {
                name: String(body.name),
                type: type,
                userID: String(session?.user.id)
            }
        });

        return NextResponse.json(
            createResponse("success", 201, "Successfully add new categories.", {
                newCategory
            })
            , { status: 201 })

    } catch (error) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                datails: error
            })
            , { status: 500 })
    }
}