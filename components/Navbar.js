import React from "react";
import Image from "next/image";
import Search from "./Search";
import { useRouter } from "next/router";
import Avatar from "react-avatar";
const Navbar = ({ user }) => {
  const name = user?.name?.split(" ")[0];
  const router = useRouter();
  return (
    <div className="flex justify-center items-center p-5 ">
      {/* left side - site logo  */}
      <div className="hidden md:flex w-14 mt-2 mr-8  ">
        <Image
          src="/favicon.ico"
          alt="Picture of the author"
          width={50}
          height={50}
          priority
          onClick={() => router.push("/")}
        />
      </div>
      {/* middle search bar */}
      <Search />
      {/* right side - refresh to sync database icon + grid to list icon + change theme icon + user icon */}
      <div className="flex-none ">
        <div className=" flex items-center justify-around p-1 bg-gray-800 rounded-lg">
          {/* <Image
            src="/favicon.ico"
            alt="Picture of the author"
            width={38}
            height={38}
            priority
          /> */}
          <Avatar
            name={
              name?.split(" ").length == 1
                ? name + " " + name[1] + name[2]
                : name
            }
            className="max-w-[35px] max-h-[35px] rounded-full "
          />
          <p className="text-gray-200 text-lg font-semibold pl-2 pr-2">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
