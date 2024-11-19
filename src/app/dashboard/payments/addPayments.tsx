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

export default function AddPaymentMethod() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({ name: null, balance: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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
        setForm({ name: null, balance: 0 });
        setIsLoading(false)
        setIsOpen(false)
        setError("")
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await axios.post("/api/accounts", {
                name: form.name,
                balance: form.balance
            }, {
                headers: { 'Content-Type': "application/json" }
            });

            if (response.status === 201) {
                mutate("/api/accounts");
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
                    <FontAwesomeIcon icon={faPlus} /> add payment
                </button>
            </div>
            {isOpen && createPortal(
                <div className="modal modal-open modal-top sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-6">Add Payment Method</h3>
                        {error && <AlertError error={error} />}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="">Method Name</label>
                                <input type="text"
                                    value={form.name ?? ''}
                                    name="name"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    className="input input-bordered input-md"
                                    placeholder="Enter method name" />
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="type">Balance</label>
                                <input type="text"
                                    value={form.balance ?? ''}
                                    name="balance"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    className="input input-bordered input-md"
                                    placeholder="Enter beginning balance" />
                            </div>
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