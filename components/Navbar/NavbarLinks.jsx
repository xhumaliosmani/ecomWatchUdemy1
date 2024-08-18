import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NavbarLinks = ({ session, setProductOpen, setAdmin }) => {
  return (
    <ul className="flex pt-2">
      <li className="px-2">
        <Button
          onMouseEnter={() => setProductOpen(true)}
          onClick={() => setProductOpen((prev) => !prev)}
        >
          <span className="text-lg no-underline transition-all duration-300 hover:text-sky-400/90">
            Watch Models
          </span>
        </Button>
      </li>
      <li className="px-2">
        <Button >
          <Link href="/blog">
            <span className="text-lg no-underline transition-all duration-300 hover:text-sky-400/90">
              Blog
            </span>
          </Link>
        </Button>
      </li>
      <li className="px-2">
        <Button>
          <Link href="/contact">
            <span className="text-lg no-underline transition-all duration-300 hover:text-sky-400/90">
              Contact
            </span>
          </Link>
        </Button>
      </li>
      <li className="px-2">
        <Button>
          <Link href="/about">
            <span className="text-lg no-underline transition-all duration-300 hover:text-sky-400/90">
              About
            </span>
          </Link>
        </Button>
      </li>
      {session?.user?.admin && (
        <li className="px-2">
          <Button
            onMouseEnter={() => setAdmin(true)}
            onClick={() => setAdmin((prev) => !prev)}
          >
            <span className="text-lg no-underline transition-all duration-300 hover:text-emerald-600/90">
              Admin Panel
            </span>
          </Button>
        </li>
      )}
    </ul>
  );
};

export default NavbarLinks;
