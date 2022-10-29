import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Heading = () => {
  const router = useRouter();
  return (
    <div className="text-center my-40 m-auto max-w-sm md:max-w-3xl">
      <div>
        <h1 className="mt-40 text-4xl font-extrabold tracking-tight leading-none text-gray-200 md:text-5xl lg:text-6xl ">
          Lets share links efficiently
        </h1>
        <p className="mt-8 text-lg font-normal text-gray-200 lg:text-lg">
          We have brought together this web app to help you share your links
          with your group in groups, so that anyone can open your links in the
          chain you are viewing them in.
        </p>

        <span
          onClick={() => router.replace("/#features")}
          className="mt-10 inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Read More
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Heading;
