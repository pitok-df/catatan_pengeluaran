'use client'

import AlertError from "@/app/components/organisme/AlertError";
import { AccountType } from "@/utils/types";
import { formatRupiah } from "@/utils/utilitis";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function AddTransaction() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({ description: null, type: "", category: null, amount: 0, account: null });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [categorySelect, setCategorySelect] = useState<{ name: string, categoryID: number }[]>([]);
    const [accounts, setAccounts] = useState<AccountType[]>([]);
    const [accountBalance, setAccountBalance] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(0);

    const fetchCategoryType = async (url: string) => {
        const response = await axios.get(url);
        setCategorySelect(response.data.data.categoryType);
    }

    const fetchAccounts = async (url: string) => {
        const response = await axios.get(url);
        setAccounts(response.data.data.accounts);
    }

    const fetchAccountById = async (url: string) => {
        const response = await axios.get(url);
        setAccountBalance(response.data.data.account?.balance);
        setRemainingBalance(response.data.data.account?.balance);
    }

    useEffect(() => {
        try {
            fetchAccounts("/api/accounts")
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const clear = () => {
        setForm({ description: null, type: "", category: null, amount: 0, account: null });
        setIsLoading(false)
        setIsOpen(false)
        setError("")
    }

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
            return;
        }
        if (form.type !== "") {
            fetchCategoryType(`/api/categories/${form.type}`)
        } else {
            setCategorySelect([])
        }
    }, [form.type])

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
            return;
        }
        if (form.account !== "") {
            fetchAccountById(`/api/accounts/${form.account}`)
        } else {
            setRemainingBalance(0);
        }

    }, [form.account])

    const handleAmountChange = () => {
        const value = Number(form.amount);
        const balance = Number(accountBalance)
        form.type === 'expense' ?
            setRemainingBalance(balance - value) :
            setRemainingBalance(balance + value)

    }

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false)
            return;
        }
        handleAmountChange();

    }, [form.amount]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await axios.post("/api/transactions", {
                accountID: form.account,
                categoryID: form.category,
                amount: form.amount,
                description: form.description,
                type: form.type
            }, {
                headers: { 'Content-Type': "application/json" }
            });

            if (response.status === 201) {
                mutate("/api/transactions");
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
                <button className="btn btn-sm btn-circle w-max px-3 btn-outline" onClick={handleModal}>
                    <FontAwesomeIcon icon={faPlus} /> add transactions
                </button>
            </div>
            {isOpen && createPortal(
                <div className="modal modal-open modal-top  sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-6">Add Transaction</h3>
                        {error && <AlertError error={error} />}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="email">Descripsi Transaction</label>
                                <input type="text"
                                    value={form.description ?? ''}
                                    name="description"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    className="input input-bordered input-md"
                                    placeholder="Enter description" />
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="type">Type</label>
                                <select name="type" value={form.type ?? ''} id="type" required className="input input-bordered input-md"
                                    onChange={
                                        (e) => setForm({ ...form, amount: 0, type: e.target.value })}>
                                    <option value="">--select type--</option>
                                    <option value="income">income</option>
                                    <option value="expense">expense</option>
                                </select>
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="category">Category</label>
                                <select
                                    value={form.category ?? ''}
                                    id="category"
                                    name="category"
                                    required
                                    className="input input-bordered input-md"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option value="">--pilih categori--</option>
                                    {
                                        categorySelect.map((ctr, index) => (
                                            <option key={index + "-optionctr"} value={ctr.categoryID}>{ctr.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="category">Payment Method</label>
                                <select
                                    required
                                    value={form.account ?? ''}
                                    id="account"
                                    name="account"
                                    className="input input-bordered input-md"
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                >
                                    <option value="">--pilih account--</option>
                                    {
                                        accounts.map((acc, index) => (
                                            <option key={index + "-optionctr"} value={acc.accountID}>{acc.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="email">Amount</label>
                                <input type="number"
                                    value={form.amount ?? ''}
                                    name="amount"
                                    required
                                    onChange={(e) => {
                                        if (form.type == 'expense') {
                                            if (Number(e.target.value) <= accountBalance) handleChange(e);
                                        } else { handleChange(e) }
                                    }}
                                    className="input input-bordered input-md"
                                    placeholder="Enter amount" />
                            </div>
                            <span>saldo: {formatRupiah(remainingBalance)}</span>
                            <div className="grid gap-5 grid-cols-2">
                                <button className="btn btn-md w-full mt-6 uppercase btn-error btn-outline" onClick={handleModal}>close</button>
                                <button type="submit" disabled={isLoading} className="btn btn-md w-full mt-6 uppercase btn-outline btn-success">{isLoading ? <><span className="loading loading-spinner"></span> Loading</> : "save"}</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}