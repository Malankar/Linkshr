import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BiSearchAlt } from "react-icons/bi";
import { BsArrowReturnRight } from "react-icons/bs";
import { UIStore } from "../store/UIStore";
import { useRouter } from "next/router";

const SearchAll = () => {
  const createdGroup = UIStore.useState((s) => s.createdGroup);
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    if (createdGroup) {
      setGroups(createdGroup);
    }
  }, [createdGroup, groups]);
  const router = useRouter();
  const [selected, setSelected] = useState(groups[0]);
  const [query, setQuery] = useState("");
  const filteredGroups =
    query === ""
      ? groups.slice(0, 1)
      : groups.filter((group) =>
          group.links.find((data) =>
            data.title.toLowerCase().includes(query.trim().toLowerCase())
          )
        );
  useEffect(() => {
    if (selected !== undefined) {
      router.push(`/groups/${selected}`);
    }
  }, [selected, router]);

  return (
    <>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <BiSearchAlt className="text-white text-lg" />
            </div>
            <Combobox.Input
              className="h-12 left-0 flex items-center border  text-sm rounded-lg w-full pl-10 p-2.5  bg-gray-800 border-gray-700 text-white outline-none "
              displayValue={(group) => group?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredGroups.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-200">
                  Nothing found.
                </div>
              ) : filteredGroups.length !== 0 && query == "" ? (
                <div></div>
              ) : (
                filteredGroups.map((group) => (
                  <div
                    key={group._id}
                    className="relative cursor-default text-white"
                    value={group._id}
                  >
                    <>
                      {group.links.map(
                        (link) =>
                          link.title
                            .toLowerCase()
                            .includes(query.trim().toLowerCase()) && (
                            <Combobox.Option
                              key={link._id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-blue-600 text-white"
                                    : "text-white"
                                }`
                              }
                              value={group._id}
                            >
                              <div
                                className="relative truncate cursor-default select-none py-2 text-white pr-4 "
                                value={group._id}
                              >
                                {link.title}
                              </div>
                            </Combobox.Option>
                          )
                      )}
                    </>
                  </div>
                ))
              )}
              {/* ... */}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
};

export default SearchAll;
