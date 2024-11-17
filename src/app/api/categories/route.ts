import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../helpers/response";
import { prisma } from "../config";
import { $Enums } from "@prisma/client";

export async function GET(req: NextRequest) {
    try {
        const categories = await prisma.categories.findMany();
        return NextResponse.json(
            createResponse("success", 200, "successfully get data", {
                categories
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
        const body = await request.json();
        const type: $Enums.TypeTransaction = body.type;
        const newCategory = await prisma.categories.create({
            data: {
                name: String(body.name),
                type: type,
                userID: String(body.userID)
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