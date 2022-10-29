import React, { useEffect, useState } from "react";
import Select from "react-select";
import { UIStore } from "../store/UIstore";

const SelectOptions = ({ handleNewGroupOption }) => {
  const options = [{ value: "Create New", label: "Create New", id: "1" }];
  const groups = UIStore.useState((s) => s.groups);
  let createdGroups = groups.groupByUser;
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

  function handleOptions(value) {
    setOption(value);
    handleNewGroupOption(false);
    if (value.value == options[0].value) {
      handleNewGroupOption(true);
    } else {
      handleNewGroupOption(false);
    }
  }
  return (
    <div>
      <Select
        styles={customStyles}
        options={options}
        className="mb-5 absolute text-sm rounded-lg block w-full border-gray-600 "
        onChange={handleOptions}
        placeholder="Select Groups || Create Groups"
      />
    </div>
  );
};

export default SelectOptions;
