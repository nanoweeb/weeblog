import { useState } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/Layout";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function submitHandler(e) {
    e.preventDefault();

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

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
            <p>if you don't have account try to sign-up</p>
          </div>
          {/* input area */}
          <div className="flex flex-col gap-2">
            <input
              name="email"
              type="text"
              placeholder="email"
              className="w-full p-2 rounded-md"
              onChange={formHandler}
            />
            <input
              name="password"
              type="text"
              placeholder="password"
              className="w-full p-2 rounded-md"
              onChange={formHandler}
            />
            <p className="text-pink-600">Forget password ?</p>
            <button
              type="submit"
              className="p-2 text-white bg-blue-600 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
