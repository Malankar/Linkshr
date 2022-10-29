import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { BiSearchAlt } from "react-icons/bi";
import { UIStore } from "../store/UIStore";
import { useRouter } from "next/router";

export default function SearchFields() {
  const [groups] = useState([]);
  const createdGroup = UIStore.useState((s) => s.createdGroup);
  if (createdGroup) {
    groups.push(createdGroup);
  }
  const [selectedGroup, setSelectedGroup] = useState();
  const [query, setQuery] = useState("");
  const [hiddenEmpty, setHiddenEmpty] = useState("");
  const router = useRouter();
  const filteredGroups =
    query === ""
      ? groups[0].filter((data) => data)
      : groups[0].filter((group) =>
          group?.name?.toLowerCase()?.includes(query?.toLowerCase())
        );
  useEffect(() => {
    if (selectedGroup) {
      let group = groups[0].filter((e) => e.name == selectedGroup);
      router.push(`/groups/${group[0]._id}`);
    }
  }, [selectedGroup, router, groups]);

  function handleChange(e) {
    setQuery(e.target.value);
    setHiddenEmpty(e.target.value);
  }
  return (
    <Combobox value={selectedGroup} onChange={setSelectedGroup}>
      {/* <Combobox.Input onChange={handleChange} className="w-full" /> */}
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <BiSearchAlt className="text-white text-lg" />
        </div>
        <Combobox.Input
          placeholder="Search Groups..."
          onChange={handleChange}
          className="h-12 left-0 flex items-center border  text-sm rounded-lg w-full pl-10 p-2.5  bg-gray-800 border-gray-700 text-white outline-none "
        />
      </div>
      {hiddenEmpty !== "" && (
        <Combobox.Options>
          {filteredGroups.map((group) => (
            <div className="bg-black rounded-lg" key={group._id}>
              <Combobox.Option
                value={group.name}
                className="bg-slate-800 rounded-sm text-white p-3 w-full "
              >
                
                {group.name}
              </Combobox.Option>
            </div>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  );
}
