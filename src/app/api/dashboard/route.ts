import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "../helpers/response";
import { prisma, userSession } from "../config";
import { $Enums } from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        const filterTime = request.nextUrl.searchParams.get("filter");
        const filterType = request.nextUrl.searchParams.get("type") as $Enums.TypeTransaction ?? "expense";
        const session: any = await userSession();
        const today = new Date();
        let labels: Array<string> = [];
        let data: Array<number> = [];
        let backgroundColor: Array<string> = [];
        let borderColor: Array<string> = [];

        // filterTime mingguan
        if (filterTime === "mingguan") {
            const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
            startOfWeek.setHours(0, 0, 0, 0);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            const expense = await prisma.transactions.findMany({
                where: {
                    type: filterType, userID: String(session?.user.id), created_at: {
                        gte: startOfWeek,
                        lte: endOfWeek
                    }
                }
            });

            backgroundColor = [
                'rgba(255, 87, 34, 0.7)',  // Oranye cerah
                'rgba(0, 191, 165, 0.7)',  // Toska cerah
                'rgba(103, 58, 183, 0.7)', // Ungu cerah
                'rgba(3, 169, 244, 0.7)',  // Biru muda
                'rgba(255, 193, 7, 0.7)',  // Kuning cerah
                'rgba(233, 30, 99, 0.7)',  // Pink cerah
                'rgba(156, 39, 176, 0.7)', // Ungu muda
            ];

            borderColor = [
                'rgba(255, 87, 34, 1)',
                'rgba(0, 191, 165, 1)',
                'rgba(103, 58, 183, 1)',
                'rgba(3, 169, 244, 1)',
                'rgba(255, 193, 7, 1)',
                'rgba(233, 30, 99, 1)',
                'rgba(156, 39, 176, 1)',
            ];

            labels = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
            data = labels.map((_, index) => {
                const dayTransactions = expense.filter((exp) => {
                    const day = new Date(exp.created_at).getDay();
                    return day === index
                });

                return dayTransactions.reduce((sum, exp) => sum + Number(exp.amount), 0);
            });

        } else if (filterTime === "bulanan") {
            const startOfMonth = new Date(today.getFullYear(), 0, 1, 0, 0, 0);
            const endOfMonth = new Date(today.getFullYear(), 11, 31, 23, 59, 59);

            const expenseMonth = await prisma.transactions.findMany({
                where: {
                    type: filterType,
                    userID: String(session?.user.id), created_at: {
                        gte: startOfMonth,
                        lte: endOfMonth
                    }
                }
            });

            backgroundColor = [
                'rgba(244, 67, 54, 0.7)',  // Merah
                'rgba(33, 150, 243, 0.7)', // Biru cerah
                'rgba(76, 175, 80, 0.7)',  // Hijau cerah
                'rgba(255, 235, 59, 0.7)', // Kuning terang
                'rgba(121, 85, 72, 0.7)',  // Coklat terang
                'rgba(255, 152, 0, 0.7)',  // Oranye terang
                'rgba(96, 125, 139, 0.7)', // Abu-abu cerah
                'rgba(139, 195, 74, 0.7)', // Hijau muda
                'rgba(63, 81, 181, 0.7)',  // Biru tua
                'rgba(236, 64, 122, 0.7)', // Pink muda
                'rgba(0, 188, 212, 0.7)',  // Cyan
                'rgba(158, 158, 158, 0.7)',// Abu-abu
            ];

            borderColor = [
                'rgba(244, 67, 54, 1)',
                'rgba(33, 150, 243, 1)',
                'rgba(76, 175, 80, 1)',
                'rgba(255, 235, 59, 1)',
                'rgba(121, 85, 72, 1)',
                'rgba(255, 152, 0, 1)',
                'rgba(96, 125, 139, 1)',
                'rgba(139, 195, 74, 1)',
                'rgba(63, 81, 181, 1)',
                'rgba(236, 64, 122, 1)',
                'rgba(0, 188, 212, 1)',
                'rgba(158, 158, 158, 1)',
            ];

            labels = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            data = labels.map((_, index) => {
                const monthlyTransaction = expenseMonth.filter((exp) => {
                    const month = new Date(exp.created_at).getMonth();
                    return month === index
                })
                return monthlyTransaction.reduce((sum, exp) => sum + Number(exp.amount), 0)
            })
        } else if (filterTime === "tahunan") {
            const currentYear = today.getFullYear();
            const tahun = Array.from({ length: 5 }, (_, index) => (currentYear - 2 + index).toString());
            const startOfYear = new Date((currentYear - 2), 0, 1, 0, 0, 0);
            const endOfYear = new Date((currentYear + 2), 11, 31, 23, 59, 59);

            const expensePeryear = await prisma.transactions.findMany({
                where: {
                    type: filterType,
                    userID: String(session?.user.id), created_at: {
                        gte: startOfYear, lte: endOfYear
                    }
                }
            });

            backgroundColor = [
                'rgba(0, 150, 136, 0.7)',  // Hijau laut
                'rgba(255, 87, 34, 0.7)',  // Oranye gelap
                'rgba(103, 58, 183, 0.7)', // Ungu tua
                'rgba(33, 150, 243, 0.7)', // Biru cerah
                'rgba(255, 193, 7, 0.7)',  // Kuning terang
            ];

            borderColor = [
                'rgba(0, 150, 136, 1)',
                'rgba(255, 87, 34, 1)',
                'rgba(103, 58, 183, 1)',
                'rgba(33, 150, 243, 1)',
                'rgba(255, 193, 7, 1)',
            ];
            labels = tahun;
            data = labels.map((years, index) => {
                const yearExpense = expensePeryear.filter((exp) => {
                    const year = new Date(exp.created_at).getFullYear();
                    return year === parseInt(years);
                });
                return yearExpense.reduce((sum, exp) => sum + Number(exp.amount), 0);
            })
        }

        return NextResponse.json(
            createResponse("success", 200, "Successfully getting data.", {
                labels: labels,
                datasets: [
                    {
                        label: `${filterType === "expense" ? "Pengeluaran" : "Pemasukan"} (Rp)`,
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 1,
                    },
                ],
            })
        );

    } catch (error: any) {
        return NextResponse.json(
            createResponse("failed", 500, "Internal server error", null, {
                details: error.message || error
            }),
            { status: 500 }
        );
    }
}