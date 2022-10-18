import React, { useEffect, useState } from "react";
import { BsFilterCircle } from "react-icons/bs";
import { AiOutlineUngroup } from "react-icons/ai";

import Group from "./Group";
import Filter from "./Filter";
import { useRouter } from "next/router";
import FGroup from "./FGroup";
import SkeletonLoading from "./SkeletonLoading";

const Groups = ({ createdGroups, forkedGroups }) => {
  const [groups, setGroups] = useState([]);
  const [fGroups, setFGroups] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (createdGroups !== null && forkedGroups !== null) {
      setFGroups([...forkedGroups]);
      setGroups([...createdGroups]);
    }
  }, [createdGroups, forkedGroups]);
  function Sorting(group) {
    if (groups.length !== 0) {
      if (group == "alphabetical") {
        setGroups((prev) =>
          prev.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        );
        router.push(router.asPath);
      } else if (group == "createdAt") {
        setGroups((prev) =>
          prev.sort((a, b) =>
            a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
          )
        );
        router.push(router.asPath);
      } else if (group == "numberOfGroups") {
        setGroups((prev) =>
          prev.sort((a, b) => b.links.length - a.links.length)
        );
        router.push(router.asPath);
      }
    }
  }
  return (
    <>
      <div className="pt-5 grid grid-cols-1 max-w-xs md:max-w-xl lg:max-w-3xl m-auto text-white">
        <div className="flex justify-between items-center">
          <div className="flex space-x-3 items-center">
            <AiOutlineUngroup className="text-gray-200 w-9 h-9" />
            <div className="flex-1">
              <h1 className="text-2xl">Groups</h1>
              <p className="text-gray-400 hidden md:flex">
                Find all your links in their respective groups
              </p>
            </div>
          </div>
          <div className="">
            <Filter Sorting={Sorting} />
          </div>
        </div>
      </div>
      {/* <div className="pt-5 grid grid-cols-1 max-w-xs md:max-w-3xl m-auto gap-4 dark:text-white">
        <h1 className="text-xl">Make a New Group... ☝️ </h1>
      </div> */}
      <div className="pt-5 grid grid-cols-1 max-w-xs md:max-w-xl lg:max-w-3xl m-auto gap-4 text-white">
        <h1 className="text-lg">Created Groups: </h1>
        {groups ? (
          <>
            <h1>No. Groups: {groups.length}</h1>
            {groups.length !== 0 ? (
              groups.map((group) => (
                <Group title={group.name} key={group._id} id={group._id} />
              ))
            ) : (
              <SkeletonLoading />
            )}
          </>
        ) : (
          <h1>No. groups: 0</h1>
        )}
        <h1 className="text-lg">Forked Groups: </h1>
        {fGroups ? (
          <>
            <h1>No. Groups: {fGroups.length}</h1>
            {fGroups.map((group) => (
              <FGroup title={group.name} key={group._id} id={group._id} />
            ))}
          </>
        ) : (
          <h1>No. Forked Groups: 0</h1>
        )}
      </div>
    </>
  );
};

export default Groups;
