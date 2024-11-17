import BreadCrumbs from "../components/organisme/BreadCrumbs";
import Sidebar from "../components/utilities/sidebar/Sidebar";


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