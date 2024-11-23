"use client"

import { fetcher } from "@/utils/swr";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import useSWR from "swr";
import { useState } from "react";

export default function ExpenseGraph() {
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
        <div className="bg-gray-800 p-3 rounded-lg w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 mb-3 items-center gap-3">
                <h2 className="text-white">Laporan {filterByType === "expense" ? "Pengeluaran" : "Pemasukan"} {filter}</h2>
                <div className="flex gap-3 justify-end items-center">
                    <label>Filter: </label>
                    <select className="select select-sm select-accent" name="filterByType" id="filterByType" onChange={(e) => setFilterByType(e.target.value)}>
                        <option value="expense">Pengeluaran</option>
                        <option value="income">Pemasukan</option>
                    </select>
                    <select className="select select-sm select-accent" name="filterBy" id="filterBy" onChange={(e) => setFilter(e.target.value)}>
                        <option value="Mingguan">Minggu</option>
                        <option value="Bulanan">Bulanan</option>
                        <option value="Tahunan">Tahun</option>
                    </select>
                </div>
            </div>
            <div className="bar">
                {
                    !data ? (<div className="skeleton bg-gray-600 w-full h-[400px]"></div>) : (
                        <Bar data={weekExpense} options={options} height={350} />
                    )
                }
            </div>
        </div>
    );
}