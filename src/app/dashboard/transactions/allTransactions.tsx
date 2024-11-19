'use client'

import { fetcher } from "@/utils/swr";
import { Transactions } from "@/utils/types";
import { formatDate, formatRupiah } from "@/utils/utilitis";
import { faEllipsisV, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
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
                        <span className="skeleton w-32 h-[1.6em]"></span>
                        <span className="skeleton w-24 h-[1.6em]"></span>
                    </div>
                </div>
                <div className="flex flex-col text-end items-end gap-1">
                    <span className="skeleton w-20 h-[1.6em]"></span>
                    <span className="skeleton w-14 h-[1.6em]"></span>
                </div>
            </div>
        ));
    }

    const data: Transactions[] = transactions.data;
    console.log(data.length);

    return data.length == 0 ? (<h1>Empty data.</h1>)
        : data.map((transaction, index) => (
            <div key={"tr-item-" + index} className="flex justify-between border-b-2 border-gray-500 p-3">
                <div className="flex gap-2">
                    <FontAwesomeIcon icon={faMoneyBill1Wave} className="text-3xl bg-orange-400 bg-opacity-10 text-orange-100 text-opacity-80 p-2 rounded-lg" />
                    <div className="flex flex-col text-start">
                        <span className="font-bold text-sm">{transaction.description ?? '~'}</span>
                        <span className="font-medium text-xs">{transaction.paymentMethod} - {formatDate(transaction.created_at)}</span>
                    </div>
                </div>
                <div className="flex flex-col text-end relative pe-1">
                    <div className="dropdown dropdown-hover dropdown-left absolute right-[-24px] top-[-7px]">
                        <div tabIndex={0} role="button" className="btn btn-neutral btn-sm btn-ghost btn-square">
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Hapus</a></li>
                        </ul>
                    </div>
                    <span className="font-bold text-sm">{formatRupiah(transaction.amount)}</span>
                    <span className="font-medium text-xs">{transaction.type === "expense" ? (
                        <div className="badge badge-sm badge-warning">{transaction.type}</div>
                    ) : (<div className="badge badge-sm badge-success">{transaction.type}</div>)}</span>
                </div>
            </div>
        ));
}