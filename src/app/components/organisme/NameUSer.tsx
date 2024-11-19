'use client'

import { useSession } from "next-auth/react";

export default function NameUser() {
    const session = useSession();
    return (
        <span className="capitalize font-bold">
            {session.data?.user?.name}
        </span>
    );
}