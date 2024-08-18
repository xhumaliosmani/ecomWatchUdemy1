import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileWithLogout from "../ProfileWithLogout";

const UserSection = ({ session }) => {
  return (
    <div>
      {session ? (
        <ProfileWithLogout />
      ) : (
        <ul className="flex mx-0 mt-2 mr-4">
          <li className="px-2">
            <Button>
              <Link
                className="text-lg no-underline transition-all duration-300 hover:text-sky-500/90"
                href={"/signup"}
              >
                Sign Up
              </Link>
            </Button>
          </li>
          <li className="px-2">
            <Button variant="myButton">
              <Link
                className="text-lg text-gray-100 no-underline transition-all duration-300 hover:text-white"
                href={"/login"}
              >
                Login
              </Link>
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserSection;
