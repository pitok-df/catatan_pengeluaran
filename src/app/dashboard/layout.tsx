import { Metadata } from "next";
import BreadCrumbs from "../components/organisme/BreadCrumbs";
import Sidebar from "../components/utilities/sidebar/Sidebar";

export const metadata: Metadata = {
    title: "Dashboard Pengeluaran",
    description: "Web untuk mencatat pengeluaran dan pemasukan anda.",
    icons: "/logo.png"
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <BreadCrumbs />
                {children}
            </div>
        </>
    );
}