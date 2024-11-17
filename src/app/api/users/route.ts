import { NextResponse } from "next/server";

const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", password: "123456" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", password: "password" },
];

export async function POST() {
    return NextResponse.json({
        id: mockUsers[0].id,
        name: mockUsers[0].name,
        email: mockUsers[0].email,
    }, { status: 200 });

}