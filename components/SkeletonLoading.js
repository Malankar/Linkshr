import React from "react";
import { FaLayerGroup } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const SkeletonLoading = () => {
  return (
    <div className="space-y-5 animate-pulse">
        <span className="block p-4 h-12 pl-10 w-full text-sm rounded-lg border capitalize bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"></span>
        <span className="block p-4 h-12 pl-10 w-full text-sm rounded-lg border capitalize bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"></span>
        <span className="block p-4 h-12 pl-10 w-full text-sm rounded-lg border capitalize bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"></span>
    </div>
  );
};

export default SkeletonLoading;
