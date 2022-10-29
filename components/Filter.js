import React, { useState } from "react";
import { RiArrowUpDownFill } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsFillCalendar2CheckFill, BsSortAlphaDown } from "react-icons/bs";
import { BiSortDown } from "react-icons/bi";

const Filter = ({ Sorting }) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropDown(true)}
      onMouseLeave={() => setOpenDropDown(false)}
    >
      <div>
        <RiArrowUpDownFill
          className={
            openDropDown ? `text-blue-400 w-5 h-5` : `text-gray-500 w-5 h-5`
          }
          //   onClick={() => setOpenDropDown((prev) => !prev)}
        />
      </div>
      {openDropDown && (
        <div className="absolute right-0 z-50 w-44 rounded bg-gray-700">
          <ul className="py-1 text-sm text-gray-200">
            <li>
              <p
                onClick={() => Sorting("alphabetical")}
                className="flex items-center py-1 px-3 cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                <BsSortAlphaDown />
                &nbsp;&nbsp;Alphabetical Order
              </p>
            </li>
            <li>
              <p
                onClick={() => Sorting("createdAt")}
                className="flex items-center py-1 px-3 cursor-pointer  hover:bg-blue-500 hover:text-white"
              >
                <BsFillCalendar2CheckFill />
                &nbsp;&nbsp;Created At
              </p>
            </li>
            <li>
              <p
                onClick={() => Sorting("numberOfGroups")}
                className="flex items-center py-1 px-3 cursor-pointer  hover:bg-blue-500 hover:text-white"
              >
                <BiSortDown />
                &nbsp;&nbsp;No. of Groups
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Filter;
