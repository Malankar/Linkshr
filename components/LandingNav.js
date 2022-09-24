import React from "react";
import Image from "next/image";
import Link from "next/link";
import useClient from "../hooks/useClient";
const LandingNav = () => {
  const user = useClient();
  return (
    <nav className="max-w-screen-sm md:max-w-screen-xl m-auto border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-transparent">
      <div className="container p-5 flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={38}
              height={38}
              priority
            />
            <span className="self-center ml-2 text-xl font-semibold whitespace-nowrap text-white">
              Lnkshr
            </span>
          </div>
        </Link>
        <div className="flex md:order-2">
          <Link href={user ? "/dashboard" : "/login"}>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
