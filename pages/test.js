import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  const id = "635d08609cb4106efbe73367";
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getGroup() {
      const getGroup = await axios.get(
        `https://linkshrapi-production.up.railway.app/group/?id=${id}`
      );
      const createdBy = getGroup?.data?.data?.createdBy;
      const getUser = await axios.get(
        `https://linkshrapi-production.up.railway.app/user?id=${createdBy}`
      );
      console.log(getUser.data.user);
      setData(getGroup);
    }
    getGroup();
  }, []);

  return (
    <div>
      <div>hi</div>
      {/* <div>{data?.data}</div> */}
    </div>
  );
};

export default Test;
