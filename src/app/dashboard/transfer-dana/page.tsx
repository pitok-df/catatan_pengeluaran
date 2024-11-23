import AllTransferDana from "./allTransferDana";
import AddTransferDana from "./transferDana";

export default function TransferDana() {
    return (
        <div>
            <AddTransferDana />
            <h1 className="text-2xl font-bold mb-6">Pemindahan Dana</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 w-full bg-gray-800 p-3 rounded max-h-[calc(100vh-36vh)] overflow-y-scroll">
                <AllTransferDana />
            </div>
        </div>
    );
}