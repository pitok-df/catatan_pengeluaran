'use client'

import { faG } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

export default function LoginGoogle() {
    return (
        <div>
            <button onClick={() => signIn("google")} className="btn w-full mt-3 bg-blue-900 border-none hover:bg-blue-700 text-white">
                Login with Google
                <FontAwesomeIcon icon={faG} size="1x" className="font-bold" />
            </button>
        </div>
    );
}
