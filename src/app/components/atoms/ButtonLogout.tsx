'use client'

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function ButttonLogout() {
    const [isOpen, setIsOpen] = useState(false);

    const handlemodal = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        signOut({ redirect: false });
        setInterval(() => {
            window.location.href = "/auth/login"
        }, 2000);
    }
    return (
        <>
            <button className="btn btn-sm btn-error w-full" onClick={handlemodal}>Logout</button>
            {isOpen && createPortal(
                <div className="modal modal-open sm:modal-middle">
                    <div className="modal-box flex justify-center flex-col items-center">
                        <FontAwesomeIcon icon={faTriangleExclamation} size="5x" />
                        <h1 className="py-4 text-xl text-center">Yakin ingin keluar?</h1>
                        <div className="modal-action ">
                            <form method="dialog" className="flex gap-3">
                                <button className="btn btn-sm btn-error" onClick={handleLogout}>Logout</button>
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