import Link from "next/link";
import React from "react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="flex justify-center md:block">
      <div className="py-6 px-4 max-w-screen-sm md:max-w-screen-xl m-auto  bg-slate-900 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-300 sm:text-center">
          © 2022 <Link href="/">Linkshr</Link>. All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
          <a
            href="https://www.facebook.com/avdhut.malankar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsFacebook className="w-5 h-5 text-blue-500 hover:text-blue-300 cursor-pointer" />
          </a>
          <a
            href="https://www.instagram.com/pixelated_renders/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram className="w-5 h-5 text-blue-500 hover:text-blue-300 cursor-pointer" />
          </a>
          <a
            href="https://twitter.com/AvdhutMalankar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitter className="w-5 h-5 text-blue-500 hover:text-blue-300 cursor-pointer" />
          </a>
          <a
            href="https://github.com/Malankar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsGithub className="w-5 h-5 text-blue-500 hover:text-blue-300 cursor-pointer" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
