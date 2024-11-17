import { faDashboard, faList, faMoneyBill, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faSignOut } from "@fortawesome/free-solid-svg-icons/faSignOut";

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
    { icon: faList, link: "/categories", title: "Kategori" },
    { icon: faMoneyBill, link: "/transactions", title: "Transaksi" }
]