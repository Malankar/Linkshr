import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import CreateGroup from "../components/CreateGroup";
import Groups from "../components/Groups";
import Navbar from "../components/Navbar";
import useClient from "../hooks/useClient";
import { UIStore } from "../store/UIStore";

const Dashboard = () => {
  const user = useClient();
  const [createdGroups, setCreatedGroups] = useState(null);
  const [forkedGroups, setForkedGroups] = useState(null);

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getGroupsByUser = async () => {
      if (user !== undefined) {
        const userId = user?._id;
        const res = axios({
          method: "GET",
          url: `/api/v1/getGroup`,
          params: { id: userId },
        })
          .then((data) => {
            UIStore.update((s) => {
              s.createdGroup = data.data.groupByUser;
            });
            UIStore.update((s) => {
              s.forkedGroup = data.data.forkedByUser;
            });
            setCreatedGroups(data.data.groupByUser);
            setForkedGroups(data.data.forkedByUser);
          })
          .catch((err) => console.log(err));
      } else {
        console.log("User not initlized");
      }
    };
    if (user) {
      getGroupsByUser();
    }
    setUserData(user);
  }, [user]);
  return (
    <div className="overflow-auto scrollbar h-screen">
      <Head>
        <title>Dashboard</title>
      </Head>
      <main className="max-w-7xl m-auto ">
        <Navbar user={userData} />
        <CreateGroup
          user={userData}
          createdGroups={createdGroups}
          userId={userData?._id}
        />
        <Groups createdGroups={createdGroups} forkedGroups={forkedGroups} />
      </main>
    </div>
  );
};

export default Dashboard;
