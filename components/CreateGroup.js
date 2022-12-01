import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import { IoIosCreate } from "react-icons/io";
import Select from "react-select";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateGroup = ({ user, createdGroups }) => {
  const options = [{ value: "Create New", label: "Create New", id: "1" }];
  if (createdGroups) {
    createdGroups?.map((value) => {
      let capitalValue = value.name[0].toUpperCase() + value.name.slice(1);
      options.push({ value: capitalValue, label: capitalValue, id: value._id });
    });
  }
  const [option, setOption] = useState(options[0]);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? "blue" : "#374151",
      color: "white",
    }),
    container: (provided) => ({
      ...provided,
      color: "white",
      background: "#374151",
    }),
    menu: (provided) => ({
      ...provided,
      color: "white",
      zIndex: "auto",
      background: "#374151",
    }),
    valueContainer: (provided) => ({
      ...provided,
      background: "#374151",
      color: "white",
    }),
    control: (provided) => ({
      ...provided,
      background: "#374151",
      color: "white",
    }),
    singleValue: (provided) => ({
      ...provided,
      background: "#374151",
      color: "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),
  };
  let [isOpen, setIsOpen] = useState(false);
  const [grpTitle, setGrpTitle] = useState("");
  function closeModal() {
    setIsOpen(false);
    setUrlTitle("");
  }
  const [urlTitle, setUrlTitle] = useState("");
  const [url, setUrl] = useState("");
  const [newGroupOption, setNewGroupOption] = useState(true);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [error, setError] = useState("");
  function handleNewGroupOption(option) {
    setNewGroupOption(option);
  }
  function handleOptions(value) {
    setOption(value);
    handleNewGroupOption(false);
    if (value.value == options[0].value) {
      handleNewGroupOption(true);
    } else {
      handleNewGroupOption(false);
    }
  }
  function Error(msg) {
    const toastMsg = (msg) =>
      toast.error(msg, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    toastMsg(msg);
  }
  const router = useRouter();
  const addGroup = async (e) => {
    e.preventDefault();
    if (url !== "" && urlTitle !== "") {
      isValidHttpUrl(url);
      if (isValidUrl) {
        //creating a new group and adding the link
        if (option.value == "Create New") {
          if (grpTitle !== "") {
            try {
              const res = await axios.post(
                "https://muddy-erin-grasshopper.cyclic.app/group",
                {
                  name: grpTitle,
                  links: { title: urlTitle, link: url },
                  createdBy: user?._id,
                }
              );
              if (res.status == 200) {
                router.reload();
              }
            } catch (err) {
              setError("Group Name Already Exists");
            }

            closeModal();
          } else {
            setError("Enter Group Title");
          }
        } else {
          try {
            const res = await axios.post(
              `https://muddy-erin-grasshopper.cyclic.app/link/${option.id}`,
              {
                title: urlTitle,
                link: url,
              }
            );
            if (res.status == 200) {
              router.reload();
            }
          } catch (err) {
            setError("Link exists in that group");
          }
          closeModal();
        }
      } else {
        closeModal();
        setUrl("");
      }
    } else {
      setError("Empty Fields");
    }
  };

  function openModal() {
    if (url !== "") {
      isValidHttpUrl(url);
    }
    setIsOpen(true);
  }

  async function isValidHttpUrl(isUrl) {
    try {
      const response = await axios.get(
        `https://muddy-erin-grasshopper.cyclic.app/link/title?url=${isUrl.trim()}`
      );
      if (response.data.title) {
        setUrlTitle(response.data.title);
        setIsValidUrl(true);
        return true;
      } else {
        setError("Invalid URL");
        setIsValidUrl(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (error !== "") {
      Error(error);
      setError("");
    }
  }, [error]);

  return (
    <>
      <div className="pt-5 grid grid-cols-1 max-w-xs md:max-w-xl lg:max-w-3xl m-auto text-white">
        <div className="flex w-2/3 justify-between items-center">
          <div className="flex space-x-3 items-center">
            <IoIosCreate className="text-gray-200 w-9 h-9" />
            <div className="flex-1">
              <h1 className="text-2xl">Create</h1>
              <p className="text-gray-400 hidden md:flex">
                Create a new group by pasting the link
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 grid grid-cols-1 max-w-xs md:max-w-xl lg:max-w-3xl m-auto gap-4 text-white">
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste a Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required=""
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            onClick={openModal}
          >
            Create
          </button>
        </div>
      </div>
      {/* modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    Create Group
                  </Dialog.Title>
                  <form>
                    <div className="mt-2">
                      <p className="text-sm text-gray-400">
                        Create a new group or add to existing one
                      </p>
                      <div className="mb-6">
                        <label
                          htmlFor="link"
                          className="block mb-2 mt-4 text-sm font-medium  text-gray-300"
                        >
                          Link
                        </label>
                        <input
                          type="text"
                          id="link"
                          className=" border text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your URL link"
                          defaultValue={url}
                          onChange={(e) => {
                            setUrl(e.target.value);
                          }}
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="Title"
                          className="block mb-2 text-sm font-medium text-gray-300"
                        >
                          Link Title
                        </label>
                        <input
                          type="text"
                          className=" border  text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your URL title"
                          defaultValue={urlTitle}
                          onChange={(e) => setUrlTitle(e.target.value)}
                          required
                        />
                      </div>
                      <hr />
                      {/* combobox autocomplete */}

                      <label
                        htmlFor="groups"
                        className="block mt-3 mb-2 text-sm font-medium text-gray-200"
                      >
                        Select a Group
                      </label>
                      <Select
                        styles={customStyles}
                        options={options}
                        className="mb-5 absolute text-sm rounded-lg block w-full border-gray-600 "
                        onChange={handleOptions}
                        placeholder="Select Groups || Create Groups"
                      />
                      {newGroupOption && (
                        <div>
                          {" "}
                          <label
                            htmlFor="grptitle"
                            className="block mb-2 text-sm font-medium text-gray-300"
                          >
                            Group Title
                          </label>
                          <input
                            type="text"
                            id="grptitle"
                            className=" border  text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your Group Title"
                            defaultValue={grpTitle}
                            onChange={(e) => setGrpTitle(e.target.value.trim())}
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex justify-center">
                      <button
                        type="submit"
                        className=" w-40 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                        onClick={addGroup}
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* error */}
      {/* {error && <Error />} */}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default CreateGroup;
