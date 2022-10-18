import Link from "next/link";
import React, { Fragment, useState } from "react";
import { RiShareBoxLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { BiErrorCircle } from "react-icons/bi";
const InLink = ({ link, title, isAuthorized, id, name, paramsId }) => {
  const [edit, setEdit] = useState(false);
  const [viewdetails, setViewdetails] = useState(false);
  const [editLink, setEditLink] = useState(link);
  const [editTitle, setEditTitle] = useState(title);
  const [groupName, setGroupName] = useState(name);
  const [deleteModal, setDeleteModal] = useState(false);

  const [error, setError] = useState(null);
  const router = useRouter();
  function EditClick(e) {
    e.stopPropagation();
    setEdit(!edit);
    setViewdetails(true);
  }
  function ViewDetails() {
    setViewdetails(!viewdetails);
    setEdit(false);
  }
  async function handleEditClick(e) {
    e.preventDefault();
    if (editLink.length !== 0 && editTitle.length !== 0) {
      const res = await axios({
        method: "PATCH",
        url: "/api/v1/updateLink",
        params: { apiSecret: process.env.NEXT_PUBLIC_API_SECRET },
        data: {
          id,
          title: editTitle,
          link: editLink,
        },
      });
      let data = res
        .then((data) => {
          console.log(data);
          router.replace(router.asPath);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
    }
  }
  async function handleDeleteClick(e) {
    e.stopPropagation();
    const res = await axios({
      method: "DELETE",
      url: "/api/v1/deleteLink",
      params: { id: paramsId, apiSecret: process.env.NEXT_PUBLIC_API_SECRET },
      data: {
        id,
      },
    });
    let data = res
      .then((data) => {
        console.log(data);
        router.replace(router.asPath);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }
  return (
    <>
      <div>
        <div
          onClick={ViewDetails}
          className="text-white flex items-center justify-between p-5 mx-8 rounded-lg  bg-neutral-800"
        >
          <h1 className="text-lg lg:text-3xl truncate select-none">{title}</h1>
          <div className=" flex items-center space-x-4 ">
            <a
              href={link} //dynamic
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiShareBoxLine className="text-blue-300 w-5 h-5" />
            </a>
            {isAuthorized && (
              <>
                <MdDeleteForever
                  onClick={() => setDeleteModal(true)}
                  className="text-blue-300 w-5 h-5 cursor-pointer"
                />
                <AiFillEdit
                  onClick={EditClick}
                  className="text-blue-300 w-5 h-5 cursor-pointer"
                />
              </>
            )}
          </div>
        </div>
        {edit && (
          <form className="p-5 mx-8 rounded-lg  bg-neutral-800">
            <div className="text-white flex items-center space-x-10 ">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Link Title
                </label>

                <input
                  type="text"
                  id="title"
                  className="border lg:w-96 text-sm rounded-lg bg-gray-700 border-gray-600 py-3 px-2 text-white"
                  defaultValue={editTitle} //dynamic
                  required
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="url"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Link Url
                </label>

                <input
                  type="text"
                  id="url"
                  className="border lg:w-96 text-sm rounded-lg bg-gray-700 border-gray-600 py-3 px-2 text-white"
                  defaultValue={editLink} //dynamic
                  onChange={(e) => setEditLink(e.target.value)}
                  required
                />
              </div>
            </div>
            <br />
            <button
              type="submit"
              className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
              onClick={handleEditClick}
            >
              Submit
            </button>
          </form>
        )}
        {viewdetails && (
          <div className="p-5 mx-8 rounded-lg  bg-neutral-800 text-white ">
            <h1 className="text-gray-400 text-md font-semibold select-none">
              Title:{" "}
              <span className="font-normal select-text"> {title} &nbsp; </span>
            </h1>
            <p className="text-gray-400 truncate font-semibold select-none">
              Link:{" "}
              <a href={link} target="_blank" rel="noopener noreferrer">
                {" "}
                <span className="text-blue-400  font-normal select-text">
                  {link}
                </span>
              </a>
            </p>
          </div>
        )}
      </div>
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
                      Are you sure you want to delete this link forever?
                    </h3>
                    <button
                      onClick={handleDeleteClick}
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

export default InLink;
