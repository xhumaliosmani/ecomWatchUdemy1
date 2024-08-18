import React, { useEffect } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import CartIconMobile from "../CartIconMobile";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Star, ChevronRight, X } from "lucide-react";

const MobileMenu = ({
  isOpen,
  setMenuClose,
  searchOpen,
  setSearchOpen,
  searchTerm,
  handleChange,
  handleSearchClose,
  firstTwelveItems,
  resultArr,
  productModile,
  setProductModile,
  setAdminPanelMob,
  session,
  user,
  adminPanelMob,
}) => {
  const { data: sessionData } = useSession();

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`dots w-full h-full flex justify-between ${
        isOpen ? "flex" : "hidden"
      } fixed top-0 left-0 z-50 bg-white`}
    >
      <div className="flex flex-col h-full w-full overflow-y-auto">
        <div className="flex justify-between items-center pt-2 ml-[-10px]">
          <Button onClick={setMenuClose} variant="ghost" className="">
            <X className="h-10 w-10" />
          </Button>
        </div>

        <div className="p-4">
          {searchOpen ? (
            <div className="bg-white pt-2">
              <div className="flex justify-between">
                <h2 className="text-2xl text-slate-800 font-bold mb-4">
                  Search Watches
                </h2>
                <Button
                  onClick={handleSearchClick}
                  variant="ghost"
                  className="text-lg text-red-400"
                >
                  Close
                </Button>
              </div>

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
          ) : (
            <Input
              onClick={handleSearchClick}
              type="text"
              name="search"
              id="search"
              value={searchTerm.search}
              onChange={handleChange}
              placeholder="Search..."
              className="text-center w-full"
              autoComplete="off"
            />
          )}
        </div>

        {searchOpen ? (
          <div className="overflow-y-auto flex-grow">
            {firstTwelveItems && firstTwelveItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 p-4">
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
                            width={150}
                            height={150}
                            quality={100}
                            className="object-cover w-full h-full"
                          />
                        </Link>
                      </div>
                      <div className="w-[65%] px-4 py-[10px]">
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
            {firstTwelveItems && resultArr.length > 12 && (
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-center">
                <Button
                  onClick={() => handleSearchClose()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  <Link href={`/searchedProducts/${searchTerm?.search}`}>
                    Show All Results
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <ul className="space-y-4 p-4">
              <li>
                <Button onClick={setMenuClose} variant="buttonUnderline">
                  <Link href="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => {
                    setAdminPanelMob(false);
                    setProductModile(!productModile);
                  }}
                  variant="buttonUnderline"
                >
                  Products
                </Button>
              </li>
              {productModile && (
                <div className="ml-4 ">
                  {[
                    "Rolex",
                    "Patek Philipe",
                    "Audemars Piguet",
                    "Richard Mille",
                    "Omega",
                    "IWC",
                    "Cartier",
                    "Tudor",
                  ].map((cat) => (
                    <li key={cat}>
                      <Button onClick={setMenuClose} variant="buttonMenuMobile">
                        <Link
                          href={`/products/brand/${cat
                            .toLowerCase()
                            .replace(" ", "")}`}
                        >
                          {cat}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </div>
              )}
              {sessionData?.user?.admin && (
                <>
                  <li>
                    <Button
                      className="text-emerald-600"
                      onClick={() => {
                        setAdminPanelMob(!adminPanelMob);
                        setProductModile(false);
                      }}
                      variant="buttonUnderline"
                    >
                      Admin Panel
                    </Button>
                  </li>
                  {adminPanelMob && (
                    <div className="ml-4">
                      {["Create Product", "Orders", "All Products"].map(
                        (cat) => (
                          <li key={cat}>
                            <Button
                              onClick={setMenuClose}
                              variant="buttonMenuMobile"
                            >
                              <Link
                                href={
                                  cat === "Create Product"
                                    ? "/create"
                                    : cat === "All Products"
                                    ? "/products"
                                    : `/${cat.toLowerCase().replace(" ", "")}`
                                }
                              >
                                {cat}
                              </Link>
                            </Button>
                          </li>
                        )
                      )}
                    </div>
                  )}
                </>
              )}
              <li>
                <Button onClick={setMenuClose} variant="buttonUnderline">
                  <Link href="/blog">Our Blog</Link>
                </Button>
              </li>
              <li>
                <Button onClick={setMenuClose} variant="buttonUnderline">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </li>
              <li>
                <Button onClick={setMenuClose} variant="buttonUnderline">
                  <Link href="/about">About Us</Link>
                </Button>
              </li>
              <li className="mt-4">
                <CartIconMobile />
              </li>
            </ul>
            <ul className="flex mt-auto mb-8 p-4">
              {session ? (
                <div className="flex px-4 mt-10 justify-between items-center w-full">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="User Image"
                    />
                  ) : (
                    <Image
                      src="/profile.jpg"
                      width={40}
                      height={40}
                      className="rounded-full"
                      alt="Default Profile"
                    />
                  )}
                  <Button className="ml-[-30px]" onClick={setMenuClose}>
                    <Link className="font-semibold text-lg" href="/profile">
                      {session.user?.name}
                    </Link>
                  </Button>
                  <div className="text-center my-auto ">
                    <Button
                      className="ml-4 border px-4 py-2 rounded-sm text-white bg-red-500 hover:bg-red-600 transition"
                      onClick={() => signOut()}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex mt-10 justify-between w-full">
                  <li className="px-2">
                    <Button onClick={setMenuClose} variant="buttonUnderline">
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </li>
                  <li className="px-2">
                    <Button onClick={setMenuClose} variant="myButton">
                      <Link className="text-lg" href="/login">
                        Login
                      </Link>
                    </Button>
                  </li>
                </div>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
