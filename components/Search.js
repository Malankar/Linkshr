import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import SearchAll from "./SearchAll";
import SearchFields from "./SearchFields";
const Search = () => {
  const [modal, setModal] = useState(false);
  const handleKeyPress = useCallback((event) => {
    if (event.ctrlKey && event.key == "k") {
      event.preventDefault();
      setModal((prev) => !prev);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <div className="grow w-14 mr-5">
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <BiSearchAlt className="text-white text-lg" />
          </div>
          <button
            onClick={() => setModal(true)}
            className="h-12 left-0 flex items-center border  text-sm rounded-lg w-full pl-10 p-2.5  bg-[#1d1d1d] text-white border-[#383838] outline-none "
          >
            Search Links...
          </button>
          <button
            type="button"
            className="absolute inset-y-0 right-0 items-center pr-3 hidden text-white md:flex"
          >
            <kbd className="px-2 py-1.5 text-xs font-semibold border rounded-lg bg-gray-800 text-gray-400 border-gray-700">
              Ctrl+K
            </kbd>
          </button>
        </div>
      </div>
      <Transition appear show={modal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full max-w-lg transform rounded-2xl text-left shadow-xl transition-all">
                  <SearchAll />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Search;
