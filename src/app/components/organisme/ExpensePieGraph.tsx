import { fetcher } from "@/utils/swr";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import useSWR from "swr";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
export default function ExpensePieGraph() {
    const [filter, setFilter] = useState("Mingguan");
    const [filterByType, setFilterByType] = useState("expense");
    const { data: data, error } = useSWR(`/api/dashboard?filter=${filter.toLowerCase()}&type=${filterByType}`, fetcher);
    if (error) { return (<h1>Failed to fetcing.</h1>) }

    let weekExpense: any = {};
    if (data) {
        weekExpense = data.data;
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                },
            }
        },
        maintainAspectRatio: false,
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
        <div className="bg-gray-800 p-3 rounded-lg w-full h-[400px] flex justify-center">
            {
                !data ? (<div className="skeleton bg-gray-600 w-full h-[300px]"></div>) : (
                    <Pie data={weekExpense} height={300} width={300} />
                )
            }

        </div>
    );
}