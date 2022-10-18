import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import CreateGroup from "../components/CreateGroup";
import Groups from "../components/Groups";
import Navbar from "../components/Navbar";
import useClient from "../hooks/useClient";
import { UIStore } from "../store/UIStore";
import { useRouter } from "next/router";

const Dashboard = () => {
  const user = useClient();
  const [createdGroups, setCreatedGroups] = useState(null);
  const [forkedGroups, setForkedGroups] = useState(null);
  const router = useRouter();
  const [userData, setUserData] = useState({});
  // console.log(userData);
  useEffect(() => {
    const getGroupsByUser = async () => {
      if (user !== undefined) {
        const userId = user?._id;
        const res = await axios({
          method: "GET",
          url: `/api/v1/getGroup`,
          params: { id: userId, apiSecret: process.env.NEXT_PUBLIC_API_SECRET },
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
    if (user !== undefined) {
      getGroupsByUser();
    }
    setUserData(user);
  }, [user]);
  useEffect(() => {
    if (userData !== null) {
      return;
    } else {
      router.replace("/login");
    }
  }, [userData, router, user]);

  return (
    <>
      {userData !== null ? (
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
      ) : (
        <div className="absolute top-1/2 left-1/2">
          <div>
            <span className="text-2xl text-white">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
