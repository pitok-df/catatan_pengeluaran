import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../helpers/response";
import { prisma, userSession } from "../config";

export async function GET(request: NextRequest) {
    try {
        const session: any = await userSession();
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const expense = await prisma.transactions.findMany({
            where: {
                type: "income", userID: String(session?.user.id), created_at: {
                    gte: startOfWeek,
                    lte: endOfWeek
                }
            }
        });

        // const arrayOfExpense = expense.map((exp) => exp.amount);
        const arrayOfDays = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        const groupByDay = arrayOfDays.map((day, index) => {
            const dayTransactions = expense.filter((exp) => {
                const day = new Date(exp.created_at).getDay();
                return day === index
            });

            return dayTransactions.reduce((sum, exp) => sum + Number(exp.amount), 0);
        });

        return NextResponse.json(
            createResponse("success", 200, "Successfully getting data.", {
                labels: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
                datasets: [
                    {
                        label: 'Pengeluaran (Rp)',
                        data: groupByDay,
                        backgroundColor: [ // Warna untuk tiap bar
                            'rgba(255, 99, 132, 0.7)',  // Bar pertama
                            'rgba(54, 162, 235, 0.7)',  // Bar kedua
                            'rgba(255, 206, 86, 0.7)',  // Bar ketiga
                            'rgba(75, 192, 192, 0.7)',  // Bar keempat
                            'rgba(153, 102, 255, 0.7)', // Bar kelima
                            'rgba(255, 159, 64, 0.7)',  // Bar keenam
                            'rgba(199, 199, 199, 0.7)', // Bar ketujuh
                        ],
                        borderColor: [ // Warna border bar
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            })
        )
    } catch (error: any) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                details: error.message || error
            }),
            { status: 500 }
        );
    }
}