'use client'

import { Accounts } from "@/utils/types";
import { faTrashAlt, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function DeletePayment({ payment }: { payment: Accounts }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`/api/accounts/${payment.accountID}`);
            if (response.status === 200) {
                toast.success(response.data.message);
                setIsOpen(!isOpen);
                mutate("/api/accounts")
            }
        } catch (error) {
            console.log(error);
            toast.error("error tidak diketahui.")
        } finally { setIsLoading(false) }

    }
    const handlemodal = () => { setIsOpen(!isOpen) }
    return (
        <>
            <FontAwesomeIcon icon={faTrashAlt} onClick={handlemodal} className="btn btn-ghost btn-xs" />
            {isOpen && createPortal(
                <div className="modal modal-open sm:modal-middle">
                    <div className="modal-box flex justify-center flex-col items-center">
                        <FontAwesomeIcon icon={faTriangleExclamation} size="5x" />
                        <h1 className="py-4 text-xl text-center">Yakin ingin menghapus <strong>{payment.name}</strong>?</h1>
                        <div className="modal-action ">
                            <form method="dialog" className="flex gap-3">
                                <button className="btn btn-sm btn-error" disabled={isLoading} onClick={handleDelete}>{isLoading ? "Deleting..." : "Delete"}</button>
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