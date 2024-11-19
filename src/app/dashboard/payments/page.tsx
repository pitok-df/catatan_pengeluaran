import { Metadata } from "next";
import AddPaymentsMethod from "./addPayments";
import AllPaymentMethod from "./allPayments";

export const metadata: Metadata = {
    title: 'Payments Method PecPen',
};

export default async function Payment() {
    return (
        <>
            <AddPaymentsMethod />
            <h1 className="text-2xl font-bold mb-6">All Payment Method</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full rounded max-h-[calc(100vh-36vh)] overflow-y-scroll">
                <AllPaymentMethod />
            </div>
        </>
    );
}
