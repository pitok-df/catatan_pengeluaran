'use client'

import AlertError from "@/app/components/organisme/AlertError";
import { fetcher } from "@/utils/swr";
import { formatRupiah } from "@/utils/utilitis";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { accounts } from "@prisma/client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

export default function AddTransferDana() {
    let account: accounts[] = [];
    const { data: accounts, error } = useSWR("/api/accounts", fetcher);
    if (!accounts) { console.log("fetching accounts"); } else { account = accounts.data; }

    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({ trFrom: "", trTo: null, amount: 0, adminFee: 0, desc: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setError] = useState("");
    const [remainingBalance, setRemainingBalance] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const selectedTrFrom = Number(account.filter((acc) => acc.accountID === form.trFrom).map((acs) => acs.balance));
        setBalance(selectedTrFrom);
        setRemainingBalance(selectedTrFrom);
    }, [form.trFrom]);

    useEffect(() => {
        const amount = Number(form.amount);
        const adminFee = Number(form.adminFee);
        const value = Number(amount + adminFee);
        const balanc = Number(balance);
        setRemainingBalance(balanc - value)
    }, [form.amount, form.adminFee])

    const clear = () => {
        setForm({ trFrom: "", trTo: null, amount: 0, adminFee: 0, desc: "" });
        setIsLoading(false)
        setIsOpen(false)
        setError("")
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await axios.post("/api/transfer-dana", { trFrom: form.trFrom, trTo: form.trTo, amount: form.amount, adminFee: form.adminFee, desc: form.desc }, {
                headers: { 'Content-Type': "application/json" }
            });

            if (response.status === 201) {
                mutate("/api/transfer-dana");
                mutate("/api/accounts")
                toast.success(response.data.message)
            }
            clear();
        } catch (error: any) {
            console.log(error);
            if (error.status === 400) {
                setError(error.response.data.message)
            }
        } finally { setIsLoading(false) }
    }
    return (
        <>
            <div className="mb-3 flex justify-end">
                <button className="btn btn-sm btn-circle w-max px-3 btn-outline mb-3" onClick={handleModal}>
                    <FontAwesomeIcon icon={faPlus} /> Transfer Dana
                </button>
            </div>
            {isOpen && createPortal(
                <div className="modal modal-open modal-top sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-6">Transfer Dana</h3>
                        {error && <AlertError error={error} />}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="trFrom">Transfer From</label>
                                <select
                                    value={form.trFrom}
                                    name="trFrom"
                                    className="input select-bordered select-md"
                                    id="trFrom"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="">--transfer from--</option>
                                    {account.map((acc, index) => (
                                        <option key={index} value={acc.accountID}>{acc.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="trTo">Transfer To</label>
                                <select
                                    value={form.trTo ?? ''}
                                    name="trTo"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    className="input select-bordered select-md"
                                    id="trTo" >
                                    <option value="">--transfer to--</option>
                                    {
                                        account.filter((value) =>
                                            value.accountID !== form.trFrom
                                        ).map((acc, index) => (
                                            <option key={"trFrom-" + index} value={acc.accountID}>{acc.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="type">Amount</label>
                                <input
                                    type="number"
                                    value={form.amount ?? '0'}
                                    name="amount"
                                    required
                                    onChange={(e) => Number(e.target.value) <= balance ? handleChange(e) : {}}
                                    className="input input-bordered input-md"
                                    placeholder="Enter total transfer" />
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="">Admin Fee</label>
                                <input
                                    type="number"
                                    value={form.adminFee ?? '0'}
                                    name="adminFee"
                                    required
                                    onChange={(e) => Number(e.target.value) <= balance ? handleChange(e) : {}}
                                    className="input input-bordered input-md"
                                    placeholder="Enter admin fee" />
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="">Description</label>
                                <input
                                    type="text"
                                    value={form.desc ?? ''}
                                    name="desc"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    className="input input-bordered input-md"
                                    placeholder="Enter description" />
                            </div>
                            <span>saldo: {formatRupiah(remainingBalance)}</span>
                            <div className="grid gap-5 grid-cols-2">
                                <button className="btn btn-md w-full mt-6 uppercase btn-error btn-outline" onClick={handleModal}>close</button>
                                <button type="submit" disabled={isLoading} className="btn btn-md w-full mt-6 uppercase btn-outline btn-success">{isLoading ? <><span className="loading loading-spinner"></span> Loading</> : "transfer"}</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}