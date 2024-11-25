'use client'

import { ExpensePieGraph, OtherInformationDashboard } from "../components/organisme/DashboardInformations";
import ExpenseGraph from "../components/organisme/ExpenseGraph";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <OtherInformationDashboard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3">
        <ExpenseGraph />
        <ExpensePieGraph />
      </div>
    </div>
  );
}
