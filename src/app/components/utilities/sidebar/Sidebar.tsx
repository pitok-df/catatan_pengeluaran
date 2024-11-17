'use client'

import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { sidebarItems } from "./sidebarItems";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ButttonLogout from "../../atoms/ButtonLogout";

export default function Sidebar() {
    const pathName = usePathname();
    console.log(pathName);

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };
    // State untuk menyimpan status dropdown mana yang terbuka
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

    // Fungsi untuk toggle dropdown berdasarkan ID
    const toggleDropdown = (id: string) => {
        setOpenDropdowns((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle status dropdown dengan ID
        }));
    };


    return (
        <>
            <button
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                </svg>
            </button>

            {/* Overlay untuk nutup sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black opacity-50 sm:hidden"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <h3 className="text-xl font-bold text-black dark:text-white text-center mb-3 border-gray-700 border-b-2 pb-4">PecPeng</h3>
                    <ul key={"asdajijodwewi"} className="space-y-2 font-medium">
                        {sidebarItems.map((item, index) => (
                            <li key={index}>
                                {item.children ?
                                    <>
                                        <button
                                            type="button"
                                            className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 
                                                ${item.children.submenu.filter((sub) => sub.link).map((item) => item.link).includes(pathName) ? "bg-gray-100 dark:bg-gray-700" : ""}`}
                                            onClick={() => toggleDropdown("drop-" + index)}>
                                            <FontAwesomeIcon icon={item.children.icon} size="1x" />
                                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{item.children.title}</span>
                                            <FontAwesomeIcon icon={faSortDown} size="1x" />
                                        </button>
                                        <ul key={"sadasdadwdasew32"} id="dropdown-example" className={`py-2 space-y-2 transition-all ${openDropdowns["drop-" + index] ? "h-max" : "h-0 hidden"}`}>
                                            {item.children.submenu.map((subitem, index) => (
                                                <li key={"subitem" + index}>
                                                    <Link href={subitem.link} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{subitem.subtitle}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                    :
                                    <Link
                                        href={item.link}
                                        className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${item.link == pathName ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon} />
                                        <span className="ms-3">{item.title}</span>
                                    </Link>
                                }
                            </li>
                        ))}
                        <ButttonLogout />
                    </ul>
                </div>
            </aside>
        </>
    );
}
