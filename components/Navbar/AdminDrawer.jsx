import React from "react";
import Link from "next/link";

const AdminDrawer = ({ admin, category, setCategory }) => {
  return (
    admin && (
      <div className="h-[28%] w-[40%] dots bg-white absolute mt-[3px] ml-[50%] z-20">
        <div className="flex justify-between w-full h-full">
          <div className="w-full h-full flex flex-col justify-between">
            <div>
              <div className="bg-slate-100 h-14 w-full flex justify-center">
                <span className="text-2xl pt-2 text-black font-bold">
                  Admin Panel
                </span>
              </div>
              <div className="bg-gray-400 h-[2px] w-full"></div>
            </div>
            <div>
              <ul>
                {["Create Product", "Orders", "Products"].map((cat) => (
                  <li
                    key={cat}
                    onMouseEnter={() => setCategory(cat)}
                    className={`text-lg w-[80%] cursor-pointer py-[5px] ml-4 ${
                      category === cat
                        ? "bg-sky-400/30 rounded-md fadeRight"
                        : null
                    }`}
                  >
                    <Link
                      href={
                        cat === "Create Product"
                          ? "/create"
                          : `/${cat.toLowerCase().replace(" ", "")}`
                      }
                      className="pl-2 text-lg"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="bg-gray-50/60 h-30 w-full flex flex-col text-center justify-center items-center">
                <div className="w-[50%] flex justify-center items-center"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-400 h-[88%] mt-[2%] w-[2px]"></div>
        </div>
      </div>
    )
  );
};

export default AdminDrawer;
