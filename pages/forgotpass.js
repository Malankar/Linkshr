import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";
const Forgotpass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
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
  async function handleClick(e) {
    e.preventDefault();
    if (email !== "") {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        try {
          const res = await axios.get(
            "https://muddy-erin-grasshopper.cyclic.app/user/forgotpass",
            {
              params: {
                email,
              },
            }
          );
          if (res.status == 200) {
            const user = res.data.data[0];
            await emailjs.send(
              process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
              process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
              {
                to_name: user.name,
                msg_email: user.email,
                msg_password: user.password,
              },
              process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );

            router.replace("/login");
          }
        } catch (err) {
          setError("Email is not registered");
        }
      } else {
        setError("Wrong Email");
      }
    } else {
      setError("Enter Email");
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
      <div className="flex items-center justify-center h-screen">
        <form>
          <h1 className="text-4xl text-center mb-10 font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            <Link href="/">Linkshr</Link>
          </h1>
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Email ID * "
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={handleClick}
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-64 sm:w-64 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send Password
              </button>

              {/* <button
              type="button"
              className="text-gray-400 hover:text-gray-50 justify-around items-center bg-[#112e5e] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <Image
                src="/googlelogo.svg"
                alt="Picture of the author"
                width={25}
                height={25}
                priority
              />
              Sign In with Google
            </button> */}
              <p className="text-white">
                Don&apos;t Have an Account ? -{" "}
                <Link href="/signup">
                  <span className="text-blue-500 cursor-pointer"> SignUp</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
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

export default Forgotpass;
