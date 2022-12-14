import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/Layout";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function register(e) {
    e.preventDefault();

    const createReq = await toast.promise(
      fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
      {
        loading: "Registering...",
        success: "Register Successfully",
        error: "Failed to Register",
      },
      {
        style: {
          borderRadius: "10px",
          background: "#263558",
          color: "#fff",
        },
      }
    );

    const createRes = await createReq.json();

    console.log("register berhasil");
    Router.push("/admin/dashboard");
  }

  function formHandler(e) {
    e.preventDefault();

    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  }

  return (
    <Layout>
      <div className="w-full h-screen flex justify-center items-center bg-[#131d35]">
        <form onSubmit={register}>
          <div className="text-gray-200 mb-10">
            <h1 className="text-5xl">Sign up to start ✍🏻</h1>
            <p>
              Already have an account ?
              <Link href="/admin/auth/login">
                <a className="text-sky-400">
                  <span>Sign-in</span>
                </a>
              </Link>
            </p>
          </div>
          {/* input area */}
          <div className="flex flex-col gap-2">
            <input
              name="email"
              type="text"
              placeholder="email"
              className="w-full p-2 rounded-md bg-slate-300 border-2 border-slate-500"
              onChange={formHandler}
            />
            <input
              name="username"
              type="text"
              placeholder="your username"
              className="w-full p-2 rounded-md bg-slate-300 border-2 border-slate-500"
              onChange={formHandler}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              className="w-full p-2 rounded-md bg-slate-300 border-2 border-slate-500"
              onChange={formHandler}
            />

            <button
              type="submit"
              className="p-2 text-white bg-blue-600 rounded-md"
            >
              Sign up
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </Layout>
  );
}
