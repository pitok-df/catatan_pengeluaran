'use client'

import { formatRupiah } from "@/utils/formatRupiah";
import { fetcher } from "@/utils/swr";
import { faEllipsisV, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";
import EditeCategory from "./editeCategory";
import DeleteCategory from "./deleteCategory";

interface categories {
    accountUse: string,
    categoryID: number,
    name: string,
    totalExpenses: number,
    type: string
}
export default function AllCategories() {
    const { data: categories, error } = useSWR("/api/categories", fetcher);
    if (error) { return (<h1>Failed fetching data</h1>) }

    if (!categories) {
        return (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
                    <div key={"-category"} className="card bg-gray-200 animate-pulse dark:bg-gray-700 p-2 px-3">
                        <div className="flex justify-between items-center pb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-500 w-20 rounded-full animate-pulse h-6"></div>
                                <div className="bg-gray-500 w-10 rounded-full animate-pulse h-6"></div>
                            </div>
                            <div className="bg-gray-500 w-5 rounded-full animate-pulse h-6"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col pb-2 gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                            <div className="flex flex-col gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
                    <div key={"-category"} className="card bg-gray-200 animate-pulse dark:bg-gray-700 p-2 px-3">
                        <div className="flex justify-between items-center pb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-500 w-20 rounded-full animate-pulse h-6"></div>
                                <div className="bg-gray-500 w-10 rounded-full animate-pulse h-6"></div>
                            </div>
                            <div className="bg-gray-500 w-5 rounded-full animate-pulse h-6"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col pb-2 gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                            <div className="flex flex-col gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
                    <div key={"-category"} className="card bg-gray-200 animate-pulse dark:bg-gray-700 p-2 px-3">
                        <div className="flex justify-between items-center pb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-500 w-20 rounded-full animate-pulse h-6"></div>
                                <div className="bg-gray-500 w-10 rounded-full animate-pulse h-6"></div>
                            </div>
                            <div className="bg-gray-500 w-5 rounded-full animate-pulse h-6"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col pb-2 gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                            <div className="flex flex-col gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
                    <div key={"-category"} className="card bg-gray-200 animate-pulse dark:bg-gray-700 p-2 px-3">
                        <div className="flex justify-between items-center pb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-500 w-20 rounded-full animate-pulse h-6"></div>
                                <div className="bg-gray-500 w-10 rounded-full animate-pulse h-6"></div>
                            </div>
                            <div className="bg-gray-500 w-5 rounded-full animate-pulse h-6"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col pb-2 gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                            <div className="flex flex-col gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
                    <div key={"-category"} className="card bg-gray-200 animate-pulse dark:bg-gray-700 p-2 px-3">
                        <div className="flex justify-between items-center pb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-500 w-20 rounded-full animate-pulse h-6"></div>
                                <div className="bg-gray-500 w-10 rounded-full animate-pulse h-6"></div>
                            </div>
                            <div className="bg-gray-500 w-5 rounded-full animate-pulse h-6"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col pb-2 gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                            <div className="flex flex-col gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
                    <div key={"-category"} className="card bg-gray-200 animate-pulse dark:bg-gray-700 p-2 px-3">
                        <div className="flex justify-between items-center pb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-500 w-20 rounded-full animate-pulse h-6"></div>
                                <div className="bg-gray-500 w-10 rounded-full animate-pulse h-6"></div>
                            </div>
                            <div className="bg-gray-500 w-5 rounded-full animate-pulse h-6"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col pb-2 gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                            <div className="flex flex-col gap-1 pt-2">
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                                <span className="bg-gray-500 w-full rounded-full animate-pulse h-6"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    const data: categories[] = categories.data.custom.categories;
    console.log(categories.data);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
            {data.map((category, index) => (
                <div key={index + "-category"} className="card bg-gray-200 dark:bg-gray-700 p-2 px-3">
                    <div className="flex justify-between items-center border-b-2 border-gray-500 pb-2">
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-semibold">{category.name}</h1>
                            <div className="badge badge-warning">{category.type}</div>
                        </div>
                        <div className="dropdown dropdown-hover dropdown-left">
                            <div tabIndex={0} role="button" className="btn btn-neutral btn-sm btn-ghost btn-square">
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li ><EditeCategory category={category} /> </li>
                                <li><DeleteCategory category={category} /></li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col border-r-2 border-gray-500 pb-2 pt-2">
                            <span className="text-[1em] font-bold">Total {category.type === "income" ? "Income" : "Expense"}</span>
                            <span className="text-[.9em] font-medium">{formatRupiah(category.totalExpenses)}</span>
                        </div>
                        <div className="flex flex-col pt-2">
                            <span className="text-[1em] font-bold">Account use</span>
                            <span className="text-[.9em] font-medium">{category.accountUse === "" ? "~" : category.accountUse}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}