import React from "react";
import Link from "next/link";
import { Input } from "../ui/input";

const ProductDrawer = ({
  productOpen,
  setProductOpen,
  category,
  setCategory,
}) => {
  return (
    productOpen && (
      <div
        className="h-[42%] w-[40%] dots bg-white z-20 absolute mt-[59px] ml-[10%]"
        onMouseLeave={() => setProductOpen(false)}
        onMouseEnter={() => setProductOpen(true)}
      >
        <div className="flex justify-between  w-full h-full">
          <div className=" w-full h-full flex flex-col justify-between">
            <div>
              <div className="bg-slate-100 h-14 w-full flex justify-center">
                <p className="text-2xl pt-2 text-black font-bold">Category</p>
              </div>
              <div className="bg-gray-400 h-[2px] w-full"></div>
            </div>
            <div>
              <ul>
                {[
                  "Rolex",
                  "Patek Philipe",
                  "Audemars Piguet",
                  "Richar Mille",
                  "Omega",
                  "IWC",
                  "Cartier",
                  "Tudor",
                ].map((cat) => (
                  <li
                    key={cat}
                    onMouseEnter={() => setCategory(cat)}
                    className={`text-lg w-[80%] cursor-pointer py-[5px] ml-4 ${
                      category === cat
                        ? " bg-sky-400/30 rounded-md fadeRight"
                        : null
                    }`}
                  >
                    <Link
                      href={`/products/brand/${cat
                        .toLowerCase()
                        .replace(" ", "")}`}
                      className="pl-2 text-lg"
                    >
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="bg-gray-400 h-[2px] w-full"></div>
              <div className="bg-gray-50/60 h-30 w-full flex flex-col text-center justify-center items-center">
                <p className="text-2xl  mt-4">Subscribe to our Newsletter!</p>
                <div className="w-[50%] flex justify-center items-center">
                  <Input
                    placeholder="Your E-Mail"
                    className="text-center w-full mb-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-400 h-[88%] mt-[2%] w-[2px]"></div>
        </div>
      </div>
    )
  );
};

export default ProductDrawer;
