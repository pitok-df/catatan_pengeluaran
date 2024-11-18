import axios from "axios";
import AddCategory from "./addButton";
import AllCategories from "./allCategories";

// const fetchCategories = async () => {
//   const response = await axios.get(process.env.NEXTAUTH_URL + "/api/categories", {
//     withCredentials: true
//   });
//   return response.data;
// }

export default async function Home() {
  // try {
  //   const categories = await fetchCategories();
  //   console.log(categories);

  // } catch (error) {
  //   console.log(error);

  // }
  return (
    <>
      <AddCategory />
      <h1 className="text-2xl font-bold mb-6">All kategori</h1>
      <AllCategories />
    </>
  );
}
