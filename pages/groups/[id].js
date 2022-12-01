import React, { useCallback, useEffect, useState } from "react";
import { FaClone, FaLayerGroup } from "react-icons/fa";
import InLink from "../../components/InLink";
import LandingNav from "../../components/LandingNav";
import useClient from "../../hooks/useClient";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import { RiFileEditFill, RiShareBoxLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Id = ({ group, user }) => {
  const loggedInUser = useClient();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [url, setUrl] = useState("");
  const [urlTitle, setUrlTitle] = useState("");
  const [error, setError] = useState("");
  const [forked, setForked] = useState(false);
  const [groupTitle, setGroupTitle] = useState(group.name);
  const [forkedGroups, setForkedGroups] = useState(null);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const router = useRouter();
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (loggedInUser?._id === user._id) {
      setIsAuthorized(true);
    }
    if (loggedInUser == undefined) {
      setIsLoggedIn(false);
    } else if (loggedInUser?._id !== group.createdBy) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loggedInUser, user, isLoggedIn, group]);
  useEffect(() => {
    const getGroupsByUser = async () => {
      if (loggedInUser !== undefined) {
        try {
          const userId = loggedInUser?._id;
          const res = await axios.get(
            `https://muddy-erin-grasshopper.cyclic.app/group/${userId}`
          );
          setForkedGroups(res.data.forkedByUser);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("User not initlized");
      }
    };
    if (loggedInUser) {
      getGroupsByUser();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (forkedGroups) {
      let a = forkedGroups.filter((data) => data._id === group._id);
      if (a.length !== 0) {
        setForked(true);
      }
    }
  }, [loggedInUser, forkedGroups, group]);

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
  useEffect(() => {
    if (error !== "") {
      Error(error);
      setError("");
    }
  }, [error]);

  const cloneGroup = async () => {
    if (forked == true) {
      setForked(true);
      return;
    } else {
      try {
        const res = await axios.post(
          `https://muddy-erin-grasshopper.cyclic.app/group/clone?id=${group._id}`,
          {
            name: groupTitle,
            links: group.links,
            createdBy: loggedInUser._id,
          }
        );
        if (res.status == 200) {
          setForked(true);
        }
      } catch (err) {
        setError("Group Name Already Exists");
      }
    }
  };
  async function createLink(e) {
    e.preventDefault();
    if (url !== "" && urlTitle !== "") {
      if (!isValidUrl) {
        setError("Invalid Url");
        return;
      }
      try {
        const res = await axios.post(
          `https://muddy-erin-grasshopper.cyclic.app/link/${group._id}`,
          {
            title: urlTitle,
            link: url,
          }
        );
        setUrl("");
        setUrlTitle("");
        router.push(router.asPath);
      } catch (err) {
        setError("Link Exists");
      }
    } else {
      setError("Enter URL & Title");
    }
  }
  // async function isValidHttpUrl(isUrl) {

  const isValidHttpUrl = useCallback(async (isUrl) => {
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
  }, []);
  function openAllLinks() {
    group.links.forEach((element) => {
      window.open(element.link, "_blank");
    });
  }
  async function changeTitle(e) {
    try {
      await axios.post(
        "https://muddy-erin-grasshopper.cyclic.app/group/title",
        {
          id: group._id,
          name: groupTitle,
          createdBy: group.createdBy,
        }
      );
      router.push(router.asPath);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (url == "") {
      setUrlTitle("");
    } else {
      isValidHttpUrl(url);
    }
  }, [url, isValidHttpUrl]);
  const createdDate = new Date(group.createdAt)
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-");
  return (
    <>
      <div className="overflow-y-scroll scrollbar h-screen">
        <Head>
          <title>{group.name}</title>
        </Head>
        <LandingNav />
        <div className="text-white max-w-md md:max-w-xl lg:max-w-5xl md:m-auto">
          <nav className=" border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-[#1B1B1B]">
            <div className="container p-5 flex flex-wrap justify-between items-center mx-auto">
              <div className="flex items-center">
                <FaLayerGroup className="w-10 h-10" />
                <input
                  type="text"
                  className=" rounded-lg capitalize p-1.5 ml-3 bg-transparent text-2xl border-blue-600"
                  size={groupTitle.length}
                  defaultValue={groupTitle}
                  disabled={isLoggedIn || isAuthorized ? "" : "disabled"}
                  placeholder="Group Name"
                  onChange={(e) => setGroupTitle(e.target.value)}
                  required
                />
                <div className="space-x-4 flex items-center">
                  {isAuthorized && (
                    <RiFileEditFill
                      onClick={changeTitle}
                      className="text-blue-300 w-5 h-5 cursor-pointer"
                    />
                  )}

                  <RiShareBoxLine
                    onClick={openAllLinks}
                    className="text-blue-300 w-5 h-5 cursor-pointer"
                  />
                  {isLoggedIn && (
                    <div
                      onClick={cloneGroup}
                      className=" flex items-center cursor-pointer bg-gray-700 px-3 py-1 rounded-full"
                    >
                      {forked ? (
                        <AiFillCheckCircle
                          onClick={cloneGroup}
                          className="text-green-300 w-5 h-5 "
                        />
                      ) : (
                        <FaClone className="text-blue-300 w-4 h-4 " />
                      )}
                      <p className="ml-2 hidden md:block">
                        {forked ? "Cloned" : "Clone"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:order-2 bg-neutral-800 p-3 rounded-lg mt-6 md:mt-0">
                <p className="">
                  Created By: <span className="font-normal">{user.name}</span>
                </p>
                <p className="">
                  Date:<span className="font-normal"> {createdDate}</span>
                </p>
              </div>
            </div>
          </nav>
        </div>
        {/* All Links */}

        <div className="pt-5  grid grid-cols-1 max-w-lg md:max-w-xl lg:max-w-5xl md:m-auto gap-4 text-white">
          {group.links.map((data) => (
            <InLink
              link={data.link}
              title={data.title}
              key={data._id}
              id={data._id}
              name={group.name}
              isAuthorized={isAuthorized}
              paramsId={group._id}
            />
          ))}
        </div>

        <hr className="my-4 mx-auto w-48 h-1 rounded border-0 md:my-10 bg-gray-700" />
        {/* add Link */}
        {isAuthorized && (
          <form className="pt-5 grid grid-cols-1 max-w-lg md:max-w-xl lg:max-w-5xl md:m-auto gap-4 text-white">
            <div className="text-white block items-center justify-between p-5 mx-8 rounded-lg  bg-neutral-800">
              <h1 className="text-xl ml-1 mb-4 font-semibold text-white">
                Create A New Link
              </h1>
              <div className="space-y-4">
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Paste a Link"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
                <input
                  type="search"
                  id="default-search"
                  className="block p-4 pl-5 w-full text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Check the Title"
                  value={urlTitle}
                  onChange={(e) => setUrlTitle(e.target.value)}
                  required
                />
              </div>

              <div className=" m-auto mt-5 text-white">
                <button
                  type="submit"
                  className="text-white font-medium rounded-lg text-md px-8 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                  onClick={createLink}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
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
export async function getServerSideProps(context) {
  try {
    const { id } = context.query;
    const getGroup = await axios.get(
      `https://muddy-erin-grasshopper.cyclic.app/group/?id=${id}`
    );
    if (getGroup) {
      const createdBy = getGroup?.data?.data?.createdBy;
      const getUser = await axios.get(
        `https://muddy-erin-grasshopper.cyclic.app/user?id=${createdBy}`
      );
      return {
        props: {
          group: JSON.parse(JSON.stringify(getGroup?.data?.data)),
          user: JSON.parse(JSON.stringify(getUser?.data?.user)),
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
export default Id;
