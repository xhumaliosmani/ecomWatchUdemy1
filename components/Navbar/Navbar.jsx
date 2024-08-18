"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import CartIcon from "../CartIcon";
import SearchDrawer from "./SearchDrawer";
import ProductDrawer from "./ProductDrawer";
import AdminDrawer from "./AdminDrawer";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";
import UserSection from "./UserSection";
import { Input } from "../ui/input";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [adminPanelMob, setAdminPanelMob] = useState(false);
  const [productModile, setProductModile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [category, setCategory] = useState("Rolex");
  const [searchTerm, setSearchTerm] = useState({ search: "" });
  const [resultArr, setResultArr] = useState([]);

  const firstTwelveItems = resultArr.slice(0, 12);
  const [isSearching, setIsSearching] = useState(false);
  const user = session?.user;

  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  console.log(session?.user);
  

  const setProductModile1 = () => {
    setProductModile(!productModile);
  };

  const setAdminPanelMobile = () => {
    setAdminPanelMob(!adminPanelMob);
  };

  const setMenuClose = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchClick = () => {
    setSearchOpen(true);
    setProductOpen(false);
  };

  function debounce(func, timeout = 1000) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const debounceSearch = debounce((currentSearchTerm) => {
    handleSubmit(currentSearchTerm);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prevState) => ({ ...prevState, [name]: value }));
    debounceSearch(value);
  };

  const handleSubmit = async (search) => {
    if (!search) return;
    setIsSearching(true);
    try {
      const res = await axios.get(`/api/products/${search}`);
      setIsSearching(false);
      if (res.status === 200) {
        setResultArr(res.data);
      }
    } catch (error) {
      setIsSearching(false);
      console.log(error);
    }
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchTerm.search !== "") {
      handleSubmit(searchTerm.search);
    }
    if (searchTerm.search === "") {
      setResultArr([]);
    }
  }, [searchTerm]);

  return (
    <div className="z-40">
      <div className="w-full bg-slate-50 h-14">
        <div className="pl-2 pt-2 md:hidden">
          {isOpen ? (
            <X onClick={handleMenuOpen} size={40} />
          ) : (
            <Menu onClick={handleMenuOpen} size={40} />
          )}
        </div>
        <div className="hidden md:flex justify-between">
          <SearchDrawer
            searchOpen={searchOpen}
            searchTerm={searchTerm}
            handleChange={handleChange}
            handleSearchClose={handleSearchClose}
            firstTwelveItems={firstTwelveItems}
            resultArr={resultArr}
          />
          <ProductDrawer
            productOpen={productOpen}
            setProductOpen={setProductOpen}
            category={category}
            setCategory={setCategory}
          />
          <div className="mt-[-17px] flex ml-4">
            <Image
              alt="s"
              onClick={() => router.push("/")}
              src="/logo1.png"
              width={65}
              height={35}
              className="cursor-pointer p-2 mt-[12px]"
            />
            <Input
              className="mt-7 h-8 w-44"
              onClick={handleSearchClick}
              placeholder="Search..."
            />
          </div>
          <NavbarLinks
            session={session}
            setProductOpen={setProductOpen}
            setAdmin={setAdmin}
          />
          <div className="z-40">
            <CartIcon />
          </div>
          <UserSection session={session} />
        </div>
      </div>
      <div
        onMouseEnter={() => setAdmin(true)}
        onMouseLeave={() => setAdmin(false)}
      >
        <AdminDrawer
          admin={admin}
          category={category}
          setCategory={setCategory}
        />
      </div>
      <MobileMenu
        isOpen={isOpen}
        setMenuClose={setMenuClose}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchTerm={searchTerm}
        handleChange={handleChange}
        handleSearchClose={handleSearchClose}
        firstTwelveItems={firstTwelveItems}
        resultArr={resultArr}
        productModile={productModile}
        setProductModile={setProductModile}
        setAdminPanelMob={setAdminPanelMob}
        session={session}
        user={user}
        adminPanelMob={adminPanelMob}
      />
    </div>
  );
};

export default Navbar;
