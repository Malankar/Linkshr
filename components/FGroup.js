import { Dialog, Transition, Combobox } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { FaLayerGroup } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";
import { MdBookmarkRemove, MdRemoveCircle } from "react-icons/md";
import useClient from "../hooks/useClient";
const FGroup = ({ title, id }) => {
  const user = useClient();
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteGroup = async () => {
    if (user) {
      const res = await axios({
        method: "DELETE",
        url: "/api/v1/removeForked",
        params: {
          id: user?._id,
          apiSecret: process.env.NEXT_PUBLIC_API_SECRET,
        },
        data: {
          id,
        },
      });
      let data = res
        .then((data) => {
          console.log(data);
          router.reload();
        })
        .catch((err) => console.log(err));
    } else {
      console.log("User Not loaded");
    }
  };
  function handleRedirect() {
    router.push(`/groups/${id}`);
  }
  return (
    <>
      <div>
        <div className="relative" onClick={handleRedirect}>
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <FaLayerGroup />
          </div>
          <span className="block p-4 pl-10 w-full text-sm rounded-lg border capitalize bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            {title}
          </span>
        </div>
        <div className="relative">
          <MdBookmarkRemove
            onClick={() => setDeleteModal(true)}
            className="text-xl text-red-500 cursor-pointer absolute right-6 bottom-4 focus:ring-4 focus:outline-none font-medium rounded-lg "
          />
        </div>
      </div>
      {/* Modal */}
      <Transition appear show={deleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setDeleteModal(false)}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl  p-6 text-left align-middle shadow-xl transition-all bg-gray-800">
                  <div className="p-2 text-center">
                    <BiErrorCircle className="mx-auto mb-4 w-14 h-14 text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-400">
                      Are you sure you want to remove this group?
                    </h3>
                    <button
                      onClick={deleteGroup}
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Yes, I&apos;m sure
                    </button>
                    <button
                      onClick={() => setDeleteModal(false)}
                      type="button"
                      className="focus:outline-none rounded-lg border  text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
                    >
                      No, cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default FGroup;
