import AddCategory from "./addButton";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Semua kategori</h1>
      <AddCategory />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
        <div className="card bg-gray-200 dark:bg-gray-700">
          <div className="card-body p-5">
            <h1 className="border-b-2 border-gray-600">Kategori</h1>
            <p>pengeluaran</p>
          </div>
        </div>
        <div className="card bg-gray-200 dark:bg-gray-700">
          <div className="card-body p-5">
            <h1 className="border-b-2 border-gray-600">Kategori</h1>
            <p>pengeluaran</p>
          </div>
        </div>
        <div className="card bg-gray-200 dark:bg-gray-700">
          <div className="card-body p-5">
            <h1 className="border-b-2 border-gray-600">Kategori</h1>
            <p>pengeluaran</p>
          </div>
        </div>
      </div>
    </>
  );
}
