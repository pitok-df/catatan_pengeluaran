import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../../helpers/response";
import { prisma } from "../../config";
import { $Enums } from "@prisma/client";


// mengambil data kategori bersarkan tipe
export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.pathname.split('/').pop() as $Enums.TypeTransaction;
        const categoryType = await prisma.categories.findFirst({
            where: {
                type: query
            }
        });

        return !categoryType ?
            NextResponse.json(createResponse("error", 404, "Data not found."), { status: 404 }) :
            NextResponse.json(createResponse("success", 200, "Successfully get data.", { categoryType }), { status: 200 });

    } catch (error) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                datails: error
            })
            , { status: 500 });
    }
}

// update categori
export async function PUT(request: NextRequest) {
    try {
        const { name, type } = await request.json();
        if (!name || !type) {
            return NextResponse.json(
                createResponse("failed", 400, "field required", null, {
                    datails: "name or type required"
                })
                , { status: 400 });
        }

        // const updatedCategory = await prisma.categories.update({
        //     where: {
        //         userID: 
        //     }
        // })
    } catch (error) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                datails: error
            })
            , { status: 500 });
    }

}
