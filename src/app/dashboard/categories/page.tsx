import { Metadata } from "next";
import AddCategory from "./addButton";
import AllCategories from "./allCategories";

export const metadata: Metadata = {
  title: 'Category PecPen',
};

export default async function Home() {
  return (
    <>
      <AddCategory />
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
        <AllCategories />
      </div>
    </>
  );
}
