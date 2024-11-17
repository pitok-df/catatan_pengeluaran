import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../../helpers/response";
import { prisma } from "../../config";
import { hash } from "bcrypt";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, fullname, password } = body || {};

        if (!email || !fullname || !password) {
            return NextResponse.json(
                createResponse("failed", 400, "Error", null, {
                    details: "Fill all required fields.",
                }),
                { status: 400 }
            );
        }

        const userExist = await prisma.users.findUnique({
            where: { email: String(email) }
        });

        if (userExist) {
            return NextResponse.json(
                createResponse("failed", 400, "Error", null, {
                    details: "Email sudah terdaftar.",
                }),
                { status: 400 }
            );
        }

        const hashedPassword = await hash(password, 10);

        await prisma.users.create({
            data: {
                email: String(email),
                name: String(fullname),
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            createResponse("success", 200, "Successfully register.", { email, fullname }),
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                details: error.message || "An unknown error occurred",
            }),
            { status: 500 }
        );
    }
}
