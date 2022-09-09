import { useState } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/Layout";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function submitHandler(e) {
    e.preventDefault();

    const loginReq = await toast.promise(
      fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
      {
        loading: "Loging In...",
        success: "Login Successfully",
        error: "Failed to Login",
      },
      {
        style: {
          borderRadius: "10px",
          background: "#263558",
          color: "#fff",
        },
      }
    );

    const loginRes = await loginReq.json();

    console.log("jwt :" + loginRes.token);

    cookie.set("token", loginRes.token);

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
        <form onSubmit={submitHandler}>
          <div className="text-gray-200 mb-10">
            <h1 className="text-5xl">Welcome Back Folks 🎉</h1>
            <p>
              if you dont have account try to
              <Link href="/admin/auth/register">
                <a className="text-sky-400">
                  <span>Sign-up</span>
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
              name="password"
              type="password"
              placeholder="password"
              className="w-full p-2 rounded-md bg-slate-300 border-2 border-slate-500"
              onChange={formHandler}
            />
            <p className="text-pink-500 ml-auto">Forget password ?</p>
            <button
              type="submit"
              className="p-2 text-white bg-blue-600 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </Layout>
  );
}
