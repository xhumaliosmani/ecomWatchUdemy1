import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchDrawer = ({
  searchOpen,
  searchTerm,
  handleChange,
  handleSearchClose,
  firstTwelveItems,
  resultArr,
}) => {
  return (
    searchOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
        onClick={() => handleSearchClose()}
      >
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 bg-gradient-to-r from-slate-200 to-slate-300">
            <h2 className="text-3xl text-slate-800 font-bold  mb-4">
              Search Products
            </h2>
            <form className="relative">
              <Input
                type="text"
                name="search"
                id="search"
                value={searchTerm.search}
                onChange={handleChange}
                placeholder="Search for watches..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-lg"
                autoComplete="off"
              />
              <svg
                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </form>
          </div>
          <div className="overflow-y-auto max-h-[calc(80vh-120px)]">
            {firstTwelveItems && firstTwelveItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {firstTwelveItems.map((prod) => (
                  <div
                    key={prod._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex">
                      <div className="w-1/3">
                        <Link
                          onClick={() => handleSearchClose()}
                          href={`/product/${prod._id}`}
                        >
                          <Image
                            src={prod.images[0] || "/placeholder-watch.jpg"}
                            alt={prod.name}
                            width={120}
                            height={120}
                            quality={100}
                            className="object-cover w-full h-full"
                          />
                        </Link>
                      </div>
                      <div className="w-2/3 p-4">
                        <Link
                          onClick={() => handleSearchClose()}
                          href={`/product/${prod._id}`}
                        >
                          <h3 className="font-semibold text-lg mb-1 text-gray-800">
                            {prod.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mb-2">
                          {prod.brand}
                        </p>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {prod.averageRating.toFixed(1)} ({prod.numReviews}{" "}
                            reviews)
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-600">
                            ${prod.price}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${prod.originalPrice}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {prod.movement} | {prod.casematerial} | {prod.glass}
                        </p>
                        <Link
                          onClick={() => handleSearchClose()}
                          href={`/product/${prod._id}`}
                          passHref
                        >
                          <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center">
                            More details
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No results found
              </div>
            )}
          </div>
          {firstTwelveItems && resultArr.length > 12 && (
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-center">
              <Button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300">
                <Link href={`/searchedProducts/${searchTerm?.search}`}>
                  Show All Results
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default SearchDrawer;
