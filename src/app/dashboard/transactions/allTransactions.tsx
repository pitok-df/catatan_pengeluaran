'use client'

import { formatRupiah } from "@/utils/formatRupiah";
import { fetcher } from "@/utils/swr";
import { Transactions } from "@/utils/types";
import { faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";

export default function AllTransactions() {
    const { data: transactions, error } = useSWR("/api/transactions", fetcher);
    const skeleton = Array.from({ length: 5 })

    if (error) { return (<div className="flex justify-center w-full bg-gray-700 p-3 rounded">Failed fetching</div>) }
    if (!transactions) {
        return skeleton.map((_, index) => (
            <div key={"trall-" + index} className="flex justify-between p-3">
                <div className="flex gap-2">
                    <div className="skeleton w-14 h-14 rounded-lg"></div>
                    <div className="flex flex-col gap-1 text-start">
                        <span className="skeleton w-52 h-[1.6em]"></span>
                        <span className="skeleton w-32 h-[1.6em]"></span>
                    </div>
                </div>
                <div className="flex flex-col text-end items-end gap-1">
                    <span className="skeleton w-32 h-[1.6em]"></span>
                    <span className="skeleton w-14 h-[1.6em]"></span>
                </div>
            </div>
        ));
    }

    console.log(transactions);

    const data: Transactions[] = transactions.data
    return data.map((transaction, index) => (
        <div key={"tr-item-" + index} className="flex justify-between border-b-2 border-gray-500 p-3">
            <div className="flex gap-2">
                <FontAwesomeIcon icon={faMoneyBill1Wave} className="text-3xl bg-red-100 bg-opacity-30 text-black p-2 rounded-lg" />
                <div className="flex flex-col text-start">
                    <span className="font-bold text-lg">{transaction.description ?? '~'}</span>
                    <span className="font-medium text-sm">{transaction.paymentMethod} - 12 12 2024</span>
                </div>
            </div>
            <div className="flex flex-col text-end">
                <span className="font-bold text-lg">{formatRupiah(transaction.amount)}</span>
                <span className="font-medium text-sm">{transaction.type === "expense" ? (
                    <div className="badge badge-sm badge-warning">{transaction.type}</div>
                ) : (<div className="badge badge-sm badge-success">{transaction.type}</div>)}</span>
            </div>
        </div>
    ));
}