'use client'

import { fetcher } from "@/utils/swr";
import { Accounts, Transactions } from "@/utils/types";
import { formatRupiah } from "@/utils/utilitis";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";

export default function AllPaymentMethod() {
    const { data: accounts, error } = useSWR("/api/accounts", fetcher);
    console.log(accounts);

    const skeleton = Array.from({ length: 5 })

    if (error) { return (<div className="flex justify-center w-full bg-gray-700 p-3 rounded">Failed fetching</div>) }
    if (!accounts) {
        return skeleton.map((_, index) => (
            <div key={"pym-item-" + index} className="flex justify-between items-center p-4 rounded-2xl h-max skeleton bg-gray-700">
                <div className="flex flex-col gap-1">
                    <div className="h-[2rem] w-24 skeleton"></div>
                    <div className="h-[1.3rem] w-32 skeleton"></div>
                </div>
                <div className="skeleton w-16 h-[3rem]"></div>
            </div>
        ));
    }

    const data: Accounts[] = accounts.data;
    console.log(data.length);

    return data.length == 0 ? (<h1>Empty data.</h1>)
        : data.map((account, index) => (

            <div key={"pym-item-" + index} className="flex justify-between items-center p-4 rounded-2xl h-max bg-purple-900">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">{account.name}</span>
                    <span className="text-sm font-semibold">{formatRupiah(account.balance)}</span>
                </div>
                <FontAwesomeIcon icon={faCreditCard} className="text-5xl shadow-md" />
            </div>
        ));
}