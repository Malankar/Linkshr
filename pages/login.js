import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/dashboard");
    }
  }, [router]);
  async function loginUser(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      try {
        const res = await axios.post(
          "https://linkshrapi-production.up.railway.app/auth/login",
          {
            email: email,
            password: password,
          }
        );
        if (res.status == 200) {
          localStorage.setItem("user", JSON.stringify(res.data));
          router.replace("/dashboard");
        } else {
          setError("Wrong Password");
        }
      } catch (err) {
        setError("User Not found");
      }
    } else {
      setError("Enter all fields");
    }
  }
  useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);
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
                onChange={(e) => setEmail(e.target.value.trim())}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Password * "
                onChange={(e) => setPassword(e.target.value.trim())}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button
                type="submit"
                onClick={loginUser}
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-64 sm:w-64 px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                SignIn
              </button>

              <p className="text-blue-400 cursor-pointer">
                <Link href="/forgotpass">Forgot Password ?</Link>
              </p>
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

export default Login;
