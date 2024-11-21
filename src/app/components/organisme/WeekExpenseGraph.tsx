"use client"

import { fetcher } from "@/utils/swr";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import useSWR from "swr";
import { title } from "process";

export default function WeekExpenseGraph() {
    const { data: data, error } = useSWR("/api/dashboard", fetcher);
    if (error) { return (<h1>Failed to fetcing.</h1>) }

    if (!data) return (<h1>Fetching...</h1>);

    const weekExpense: any = data.data;
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white', // Warna teks di legend
                },
            },
            title: {
                display: true,
                text: 'Laporan Pengeluaran Mingguan',
                color: 'white', // Warna teks title
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white', // Warna teks label sumbu X
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)', // Warna garis grid sumbu X
                },
            },
            y: {
                ticks: {
                    color: 'white', // Warna teks label sumbu Y
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)', // Warna garis grid sumbu Y
                },
            },
        },
    };

    return (
        <div className="bg-gray-800 p-3 rounded-lg h-max">
            <Bar data={weekExpense} options={options} />
        </div>
    );
}