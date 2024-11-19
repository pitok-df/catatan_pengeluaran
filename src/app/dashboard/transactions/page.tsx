import { Metadata } from "next";
import AddTransaction from "./addTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";
import AllTransactions from "./allTransactions";

export const metadata: Metadata = {
  title: 'Transactions PecPen',
};

export default async function Home() {
  return (
    <>
      <AddTransaction />
      <h1 className="text-2xl font-bold mb-6">All Transactions</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full bg-gray-700 p-3 rounded max-h-[calc(100vh-10vh)] overflow-y-scroll">
        <AllTransactions />
      </div>
    </>
  );
}
