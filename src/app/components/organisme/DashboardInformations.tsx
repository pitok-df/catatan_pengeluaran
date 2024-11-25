import { fetcher } from "@/utils/swr";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import useSWR from "swr";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, DatasetChartOptions, DatasetController } from 'chart.js';
import { Categories, Transaction } from "@/utils/types";
import { backgroundColor, borderColor, formatDate, formatRupiah } from "@/utils/utilitis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange } from "@fortawesome/free-solid-svg-icons";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const fetchingData = () => {
    const { data: data, error } = useSWR(`/api/dashboard/others`, fetcher);
    console.log(data);
    return { data, error };
}

export function ExpensePieGraph() {
    const [filtertype, setFilterType] = useState<"expense" | "income">("expense");
    const { data, error } = fetchingData();
    if (error) { return (<h1>Failed to fetcing.</h1>) }

    if (!data) return (
        <div className="bg-gray-800 p-3 rounded-lg h-full flex justify-center">
            <div className="skeleton bg-gray-600 h-[350px] w-full"></div>
        </div>
    );

    const categories: Categories[] = data.data.categories;
    const categoriesFilter = categories.filter((ctr) => ctr.type === filtertype);
    const labels = categoriesFilter.map((ctgr) => ctgr.name);
    const datas = categoriesFilter.map((ctrg) => ctrg.transaction.reduce((sum: number, tr) => Number(sum) + Number(tr.amount), 0))

    const dataPie: any = {
        labels: labels,
        datasets: [{
            label: `${filtertype === "expense" ? "Pengeluaran" : "Pemasukkan"} (Rp) `,
            data: datas,
            hoverOffset: 4
        }]
    }
    return (
        <div className="bg-gray-800 p-3 h-full rounded-lg">
            <div className="flex justify-between mb-3 items-center gap-3">
                <h2 className="text-white">Total {filtertype === "expense" ? "Pengeluaran" : "Pemasukan"} per Kategori</h2>
                <div className="flex gap-3 justify-end items-center">
                    <label>Filter: </label>
                    <select className="select select-sm select-accent" name="filterByType" id="filterByType" onChange={(e) => setFilterType(e.target.value as "expense" | "income")}>
                        <option value="expense">Pengeluaran</option>
                        <option value="income">Pemasukan</option>
                    </select>
                </div>
            </div>
            <div className="bar">
                <Pie data={dataPie} height={350} options={{ maintainAspectRatio: false, borderColor: borderColor, backgroundColor: backgroundColor, color: "white" }} />
            </div>
        </div>
    );
}

export function OtherInformationDashboard() {
    const { data, error } = fetchingData();
    if (error) { return (<h1>Failed to fetcing.</h1>) }

    if (!data) return (
        <>
            <div className="bg-gray-700 skeleton h-20 rounded-md"></div>
            <div className="bg-gray-700 skeleton h-20 rounded-md"></div>
            <div className="bg-gray-700 skeleton h-20 rounded-md"></div>
        </>
    );

    const today = new Date();
    const startToday = new Date(today.setHours(0, 0, 0, 0));
    const endToday = new Date(today.setHours(23, 59, 59, 99));

    const startOfMonth = new Date(today.setDate(1))
    startOfMonth.setHours(0, 0, 0, 0)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    endOfMonth.setHours(23, 59, 59, 59)




    const transaction: Transaction[] = data.data.transactions;

    const latestTransaction = transaction.filter((trans) => {
        const transDate = new Date(trans.created_at);
        return transDate >= startToday && transDate <= endToday;
    });

    const montlyTransaction = transaction.filter((trans) => {
        const transDate = new Date(trans.created_at);
        return transDate >= startOfMonth && transDate <= endOfMonth;
    });

    const latestExpense = latestTransaction.filter((tran) => tran.type === "expense").pop();
    const latestIncome = latestTransaction.filter((tran) => tran.type === "income").pop();
    const totPengeluran = montlyTransaction.filter((filter) => filter.type === "expense").reduce((sum, trans) => Number(sum) + Number(trans.amount), 0);
    const totPemasukan = montlyTransaction.filter((filter) => filter.type === "income").reduce((sum, trans) => Number(sum) + Number(trans.amount), 0);

    return (
        <>
            <div className="bg-gray-800 h-28 p-3 border border-gray-700 flex items-center justify-between rounded-md">
                <div className="">
                    <h1 className="font-bold text-white">Pengeluaran terbaru</h1>
                    <p className="text-white font-normal text-sm">{!latestExpense ? "Belum ada pengluaran hari ini" : `${latestExpense.account.name} - ${formatRupiah(latestExpense.amount)}`}</p>
                </div>
                <FontAwesomeIcon icon={faExchange} size="2xl" />
            </div>
            <div className="bg-gray-800 h-28 p-3 border border-gray-700 flex items-center justify-between rounded-md">
                <div className="">
                    <h1 className="font-bold text-white">Pemasukan terbaru</h1>
                    <p className="text-white font-normal text-sm">{!latestIncome ? "Belum ada pemasukan hari ini" : `${latestIncome.account.name} - ${formatRupiah(latestIncome.amount)}`}</p>
                </div>
                <FontAwesomeIcon icon={faExchange} size="2xl" />
            </div>
            <div className="bg-gray-800 grid grid-cols-1 h-28 p-3 border border-gray-700 rounded-md">
                <h1 className="font-bold text-white">{formatDate(startOfMonth.toString())} - {formatDate(endOfMonth.toString())}</h1>
                <div className="grid grid-cols-2">
                    <p className="text-white font-normal text-sm">Expense: {formatRupiah(totPengeluran)}</p>
                    <p className="text-white font-normal text-sm">Income: {formatRupiah(totPemasukan)}</p>
                </div>
                <p className={` font-normal text-sm ${totPemasukan - totPengeluran < 0 ? "text-error" : "text-white"}`}>Selisih: {formatRupiah(totPemasukan - totPengeluran)}</p>
            </div>
        </>
    );
}