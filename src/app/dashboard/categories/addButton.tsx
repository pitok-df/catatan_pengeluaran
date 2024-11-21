'use client'

import AlertError from "@/app/components/organisme/AlertError";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function AddCategory() {
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({ name: null, type: null });
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
        setForm({ name: null, type: null });
        setIsLoading(false)
        setIsOpen(false)
        setError("")
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/categories", { name: form.name, type: form.type }, {
                headers: { 'Content-Type': "applications/json" }
            });
            if (response.status === 201) {
                mutate("/api/categories");
                toast.success(response.data.message)
            }
            clear();
        } catch (error: any) {
            if (error.status === 400) {
                setError(error.response.data.message)
            }
            console.log(error);

        }
    }
    return (
        <>
            <div className="mb-3 flex justify-end">
                <button className="btn btn-sm btn-circle w-max px-3 btn-outline" onClick={handleModal}>
                    <FontAwesomeIcon icon={faPlus} /> add category
                </button>
            </div>
            {isOpen && createPortal(
                <div className="modal modal-open modal-top  sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-6">Add Category</h3>
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