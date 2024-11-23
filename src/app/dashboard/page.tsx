'use client'

import { useSession } from "next-auth/react";
import ExpenseGraph from "../components/organisme/ExpenseGraph";
import ExpensePieGraph from "../components/organisme/ExpensePieGraph";

export default function Home() {
  const session = useSession();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3">
      <ExpenseGraph />
      <ExpensePieGraph />
    </div>
  );
}
