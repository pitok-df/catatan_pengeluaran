import { faCreditCard, faDashboard, faList, faMoneyBill, IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface SidebarItem {
    title: string;
    link: string;
    icon: IconDefinition;
    children?: {
        icon: IconDefinition,
        title: string,
        submenu: ChildItem[]// Subitem adalah array karena bisa punya banyak anak
    }
}

interface ChildItem {
    link: string;
    subtitle: string;
}


export const sidebarItems: SidebarItem[] = [
    { icon: faDashboard, link: "/dashboard", title: "Dashboard" },
    { icon: faList, link: "/dashboard/categories", title: "Kategori" },
    { icon: faCreditCard, link: "/dashboard/payments", title: "Payments" },
    { icon: faMoneyBill, link: "/dashboard/transactions", title: "Transaksi" }
]