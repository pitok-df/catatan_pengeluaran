'use client'

import { useSession } from "next-auth/react";
import WeekExpenseGraph from "../components/organisme/WeekExpenseGraph";

export default function Home() {
  const session = useSession();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <WeekExpenseGraph />
    </div>
  );
}
