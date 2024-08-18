import { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

const ProfileWithLogout = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center pr-8 mt-2"
      onMouseEnter={() => setIsHovered(true)}
    >
      <div className="text-center font-semibold mr-2">Profile</div>
      <div className="relative">
        <Image
          onMouseEnter={() => setIsHovered(true)}
          src={user?.image || "/profile.jpg"}
          width={40}
          height={40}
          className="rounded-full hover:border-2 border-emerald-500 transition-all duration-100"
          alt="Profile Picture"
          unoptimized
        />
        {isHovered && (
          <div
            onMouseLeave={() => setIsHovered(false)}
            className="absolute z-20 top-full right-0 mt-4 w-32 bg-white border border-gray-200 rounded-md shadow-lg"
          >
            <button className="w-full flex justify-center px-4 py-2 text-left hover:bg-gray-100">
              <Link href="/profile">Profile</Link>
            </button>
            <Button
              variant="myButton"
              onMouseEnter={() => setIsHovered(true)}
              className="w-full flex justify-center px-4 py-2 text-left"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileWithLogout;
