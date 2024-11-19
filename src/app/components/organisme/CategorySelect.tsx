'use client'

export default function CategorySelect({ type }: { type: "income" | "expense" }) {

    return (
        <select className="input input-bordered input-md">
            <option value="">--pilih categori--</option>
        </select>
    );
}