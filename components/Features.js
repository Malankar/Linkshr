import React from "react";
import { AiOutlineMobile } from "react-icons/ai";
import { BiRefresh, BiSearchAlt, BiText } from "react-icons/bi";
import { BsFillShareFill } from "react-icons/bs";
import { FaClone, FaFilter, FaKeyboard } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";

const Features = () => {
  return (
    <>
      <div className="rounded-lg grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 h-full gap-4 w-3/4 p-6 mx-auto mt-5 border-gray-800 border">
        <div className="bg-[#27292B] rounded-lg h-full">
          <div className="h-1/3 mt-5 mb-2  items-center flex justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-400 rounded-full flex justify-center items-center ">
              <FaKeyboard className="text-gray-800 h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
          <div className="h-1/2 p-5 text-white ">
            <h1 className="text-xl ">Quick Actions</h1>
            <p className="mt-2 text-md text-gray-400">
              Speed up your work and reduce repetitive tasks. You can use &nbsp;
              <kbd className="text-xs font-semibold border p-1 rounded-md bg-gray-600 text-gray-100 border-gray-500">
                CTRL+K
              </kbd>
              &nbsp; to search content
            </p>
          </div>
          <div className="h-1/2 p-5 text-lg text-white"></div>
        </div>
        <div className="bg-[#27292B] rounded-lg h-full">
          <div className="h-1/3 mt-5 mb-2  items-center flex justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-400 rounded-full flex justify-center items-center ">
              <BiSearchAlt className="text-gray-800 h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
          <div className="h-1/2 p-5 text-white ">
            <h1 className="text-xl">Search Content</h1>
            <p className="mt-2 text-gray-400">
              Look for links throughout your groups, and click on it to visit
              the group.
            </p>
          </div>
        </div>
        <div className="bg-[#27292B] rounded-lg h-full">
          <div className="h-1/3 mt-5 mb-2  items-center flex justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-400 rounded-full flex justify-center items-center ">
              <IoIosCreate className="text-gray-800 h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
          <div className="h-1/2 p-5 text-white ">
            <h1 className="text-xl">CRUD Operations</h1>
            <p className="mt-2 text-gray-400">
              Do Create, Read, Update &amp; Delete operations on Groups and
              Links
            </p>
          </div>
        </div>
        <div className="bg-[#27292B] rounded-lg h-full">
          <div className="h-1/3 mt-5 mb-2 items-center flex justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-400 rounded-full flex justify-center items-center ">
              <FaClone className="text-gray-800 h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
          <div className="h-1/2 p-5 text-white ">
            <h1 className="text-xl">Clone</h1>
            <p className="mt-2 text-gray-400">
              Fork other Groups and modify them to meet your needs.
            </p>
          </div>
        </div>
        <div className="bg-[#27292B] rounded-lg h-full">
          <div className="h-1/3 mt-5 mb-2 items-center flex justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-400 rounded-full flex justify-center items-center ">
              <BiText className="text-gray-800 h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
          <div className="h-1/2 p-5 text-white ">
            <h1 className="text-xl">Automation</h1>
            <p className="mt-2 text-gray-400">
              Automatic Title generation for your links, just add your links and
              we will provides its title for you.
            </p>
          </div>
        </div>
        <div className="bg-[#27292B] rounded-lg h-full">
          <div className="h-1/3 mt-5 mb-2 items-center flex justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-400 rounded-full flex justify-center items-center ">
              <FaFilter className="text-gray-800 h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
          <div className="h-1/2 p-5 text-white ">
            <h1 className="text-xl">Filter Groups</h1>
            <p className="mt-2 text-gray-400">
              Filter the groups to meet your needs.
            </p>
          </div>
        </div>
        <div className="bg-[#27292B] rounded-lg h-full">
          <div className="h-1/3 mt-5 mb-2 items-center flex justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-400 rounded-full flex justify-center items-center ">
              <BsFillShareFill className="text-gray-800 h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
          <div className="h-1/2 p-5 text-white ">
            <h1 className="text-xl">Share Groups</h1>
            <p className="mt-2 text-gray-400">
              Share Your Groups with anyone &amp; anywhere,with the custom
              provided link
            </p>
          </div>
        </div>
        <div className="bg-[#27292B] rounded-lg h-full">
          <div className="h-1/3 mt-5 mb-2 items-center flex justify-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-blue-400 rounded-full flex justify-center items-center ">
              <BiRefresh className="text-gray-800 h-12 w-12 md:h-16 md:w-16" />
            </div>
          </div>
          <div className="h-1/2 p-5 text-white ">
            <h1 className="text-xl">Fast Refresh</h1>
            <p className="mt-2 text-gray-400">
              While editing your links you can see changes in real time as its
              server side rendered.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
