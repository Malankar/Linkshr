import React, { useState } from "react";
import Image from "next/image";
import Search from "./Search";
import { useRouter } from "next/router";
import Avatar from "react-avatar";
import { MdLogout } from "react-icons/md";
const Navbar = ({ user }) => {
  const name = user?.name?.split(" ")[0];
  const router = useRouter();
  const [hidden, setHidden] = useState(true);
  function Logout() {
    if (user !== undefined && typeof localStorage !== "undefined") {
      localStorage.clear();
      router.push("/login");
    } else {
      router.replace("/");
    }
  }
  return (
    <div
      className="flex justify-center items-center p-5 "
      onMouseLeave={(e) => {
        setHidden(true);
      }}
    >
      {/* left side - site logo  */}
      <div className="hidden md:flex w-14 mt-2 mr-8  ">
        <Image
          src="/favicon.svg"
          alt="logo"
          width={50}
          height={50}
          priority
          onClick={() => router.push("/")}
        />
      </div>
      {/* middle search bar */}
      <Search />
      {/* right side - refresh to sync database icon + grid to list icon + change theme icon + user icon */}
      <div
        className="relative"
        onMouseOver={(e) => {
          setHidden(false);
        }}
      >
        <div className="flex-none">
          <div className="cursor-pointer flex items-center justify-around p-1 border-2 border-slate-700 bg-gray-800 rounded-lg">
            <div className="border-2 border-blue-600 rounded-full">
              <Avatar
                name={
                  name?.split(" ").length == 1
                    ? name + " " + name[1] + name[2]
                    : name
                }
                className="max-w-[35px] max-h-[35px] rounded-full "
              />
            </div>
            <p className="text-gray-200 select-none text-lg font-semibold pl-2 pr-2">
              {name}
            </p>
          </div>
        </div>
        <div
          id="dropdown"
          className={
            hidden
              ? "hidden"
              : "absolute cursor-pointer z-10 w-36 right-4/4 mt-2 rounded-lg shadow bg-gray-700"
          }
        >
          <ul
            className="py-1 text-sm text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li className="flex items-center" onClick={Logout}>
              <MdLogout className="ml-2 h-5 w-5" />
              <span className="block py-2 px-4 hover:text-white">Sign out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
