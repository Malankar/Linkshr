import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.replace("/dashboard");
    }
  }, [router]);
  async function loginUser(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      const res = axios({
        method: "POST",
        url: "/api/v1/loginUser",
        data: {
          email: email,
          password: password,
        },
      })
        .then((data) => {
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.data));
          router.replace("/dashboard");
        })
        .catch((err) => console.log(err));
    } else {
      setError("Enter all fields");
    }
  }
  useEffect(() => {
    router.prefetch("/dashboard");
  }, []);
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen">
      <form>
        <h1 className="text-4xl text-center mb-10 font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Linkshr
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
              onChange={(e) => setPassword(e.target.value)}
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
            <div className="flex justify-center items-center w-full">
              <hr className="my-8 w-64 h-1 bg-gray-200 rounded border-0 dark:bg-gray-700" />
              <div className="absolute left-1/2 top-3/3 mb-1 px-3 bg-white -translate-x-1/2 dark:bg-[#1B1B1B] text-white">
                OR
              </div>
            </div>

            <button
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
  );
};

export default Login;
