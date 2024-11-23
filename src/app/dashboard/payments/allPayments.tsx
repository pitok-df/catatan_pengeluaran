'use client'

import { fetcher } from "@/utils/swr";
import { Accounts, Transactions } from "@/utils/types";
import { formatRupiah } from "@/utils/utilitis";
import { faCreditCard, faEllipsisV, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";
import DeletePayment from "./deletePayment";

export default function AllPaymentMethod() {
    const { data: accounts, error } = useSWR("/api/accounts", fetcher);

    const skeleton = Array.from({ length: 5 })

    if (error) { return (<div className="flex justify-center w-full bg-gray-700 p-3 rounded">Failed fetching</div>) }
    if (!accounts) {
        return skeleton.map((_, index) => (
            <div key={"pym-item-" + index} className="flex justify-between items-center p-4 rounded-2xl h-max bg-gray-600 skeleton">
                <div className="flex">
                    <div className="h-[3rem] w-[4rem] skeleton bg-gray-700 me-3"></div>
                    <div className="flex flex-col gap-1">
                        <div className="skeleton bg-gray-700 h-[1rem] w-[3rem]"></div>
                        <div className="skeleton bg-gray-700 h-[1rem] w-[6rem]"></div>
                    </div>
                </div>
                <div className="skeleton bg-gray-700 h-[3rem] w-[2.6rem]"></div>
            </div>
        ));
    }

    const data: Accounts[] = accounts.data;

    return data.length == 0 ? (<h1>Empty data.</h1>)
        : data.map((account, index) => (
            <div key={"pym-item-" + index} className="flex relative justify-between items-center p-4 rounded-2xl h-max bg-blue-900">
                <div className="flex">
                    <FontAwesomeIcon icon={faCreditCard} className="text-5xl shadow-md me-3" />
                    <div className="flex flex-col">
                        <span className="text-1xl font-bold">{account.name}</span>
                        <span className="text-sm font-semibold">{formatRupiah(account.balance)}</span>
                    </div>
                </div>
                <DeletePayment payment={account} />
            </div>
        ));
}