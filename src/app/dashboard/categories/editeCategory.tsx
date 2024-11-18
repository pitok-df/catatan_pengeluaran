'use client'

import AlertError from "@/app/components/organisme/AlertError";
import { faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface categories {
    accountUse: string,
    categoryID: number,
    name: string,
    totalExpenses: number,
    type: string
}


export default function EditeCategory({ category }: { category: categories }) {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({ name: category.name, type: category.type as string });
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
        setIsLoading(false)
        setIsOpen(false)
        setError("")
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await axios.put(`/api/categories/${category.categoryID}`, { name: form.name, type: form.type }, {
                headers: { 'Content-Type': "applications/json" }
            });
            if (response.status === 200) {
                mutate("/api/categories");
                toast.success(response.data.message)
            }
            clear();
        } catch (error: any) {
            if (error.status === 400) {
                setError(error.response.data.message)
            }
        } finally { setIsLoading(false) }
    }
    return (
        <>
            <a onClick={handleModal} className="flex justify-between">Edite <FontAwesomeIcon icon={faPencilAlt} /></a>
            {isOpen && createPortal(
                <div className="modal modal-open modal-top  sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-6">Update Category</h3>
                        {error && <AlertError error={error} />}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="email">Category Name</label>
                                <input type="text"
                                    value={form.name ?? ''}
                                    name="name"
                                    required
                                    onChange={(e) => handleChange(e)}
                                    className="input input-bordered input-md"
                                    placeholder="Enter category name" />
                            </div>
                            <div className="mb-3 gap-2 flex flex-col">
                                <label className="ms-2" htmlFor="type">Type</label>
                                <select name="type" value={form.type ?? ''} id="type" className="input input-bordered input-md" onChange={(e) => handleChange(e)}>
                                    <option value="">--select type--</option>
                                    <option value="income">income</option>
                                    <option value="expense">expense</option>
                                </select>
                            </div>
                            <div className="grid gap-5 grid-cols-2">
                                <button className="btn btn-md w-full mt-6 uppercase btn-error btn-outline" onClick={handleModal}>close</button>
                                <button type="submit" disabled={isLoading} className="btn btn-md w-full mt-6 uppercase btn-outline btn-success">{isLoading ? <><span className="loading loading-spinner"></span> Loading</> : "update"}</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}