'use client'

import { fetcher } from "@/utils/swr";
import { TransferDana } from "@/utils/types";
import { formatDate, formatRupiah } from "@/utils/utilitis";
import { faEllipsisV, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";

export default function AllTransferDana() {
    const { data: response, error } = useSWR("/api/transfer-dana", fetcher);
    const skeleton = Array.from({ length: 5 })

    if (error) { return (<div className="flex justify-center w-full bg-gray-700 p-3 rounded">Failed fetching</div>) }
    if (!response) {
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

    const data: TransferDana[] = response.data;

    console.log(data);

    return data.length == 0 ? (<h1>Empty data.</h1>)
        : data.map((transfer, index) => (
            <div key={"tr-item-" + index} className="flex justify-between border-b-2 border-gray-500 p-3">
                <div className="flex gap-2">
                    <FontAwesomeIcon icon={faMoneyBill1Wave} className="text-3xl bg-orange-400 bg-opacity-10 text-orange-100 text-opacity-80 p-2 rounded-lg" />
                    <div className="flex flex-col text-start">
                        <span className="font-bold text-sm">{transfer.trFroms.name} to {transfer.trTos.name} ~ {transfer.desc}</span>
                        <span className="font-medium text-xs">{formatDate(transfer.created_at)}</span>
                    </div>
                </div>
                <div className="flex flex-col text-end relative pe-1">
                    <span className="font-bold text-sm">{formatRupiah(transfer.amount)}</span>
                    <span className="font-medium text-xs">Admin fee: {formatRupiah(transfer.adminFee)}</span>
                </div>
            </div>
        )
        );
}