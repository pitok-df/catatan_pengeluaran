'use client'

import { faTrashAlt, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function DeleteCategory({ category }: { category: { categoryID: number, name: string } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handlemodal = () => {
        setIsOpen(!isOpen);
    }

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`/api/categories/${category.categoryID}`);
            if (response.status === 200) {
                mutate("/api/categories");
                toast.success(response.data.message)
                setIsOpen(!isOpen)
            }
        } catch (error: any) {
            if (error.status === 400) {
                toast.error(error.response.data.message)
            }
        } finally { setIsLoading(false) }
    }
    return (
        <>
            <a onClick={handlemodal} className="flex justify-between">Hapus <FontAwesomeIcon icon={faTrashAlt} /></a>
            {isOpen && createPortal(
                <div className="modal modal-open sm:modal-middle">
                    <div className="modal-box flex justify-center flex-col items-center">
                        <FontAwesomeIcon icon={faTriangleExclamation} size="5x" />
                        <h1 className="py-4 text-xl text-center">Yakin ingin menghapus <strong>{category.name}</strong>?</h1>
                        <div className="modal-action ">
                            <form method="dialog" className="flex gap-3">
                                <button className="btn btn-sm btn-error" onClick={handleDelete}>{isLoading ? "Deleting..." : "Delete"}</button>
                                <button className="btn btn-secondary btn-sm" onClick={handlemodal}>Close</button>
                            </form>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}