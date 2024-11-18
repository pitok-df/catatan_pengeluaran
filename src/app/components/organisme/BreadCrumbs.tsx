'use client'

import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const pathName = usePathname();
  console.log(pathName);

  const arrayPath = pathName.split("/")
  return (
    <>
      <div className="breadcrumbs text-sm right-10 top-3 mb-3">
        <ul key={"dsjhkj"}>
          {arrayPath.map((value, index) => (
            <li key={index}><a>{value}</a></li>
          ))}
        </ul>
      </div>
    </>
  );
}