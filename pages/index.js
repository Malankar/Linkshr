import Head from "next/head";
import Landing from "../components/Landing";
import Dashboard from "./dashboard";

export default function Home() {
  return (
    <div className="dark:bg-[#1b1b1b] h-full ">
      <Head>
        <title>Linkshr</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Landing />

      {/* <Dashboard/> */}
    </div>
  );
}
