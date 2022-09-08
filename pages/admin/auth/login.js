import { useState } from "react";
import cookie from "js-cookie";
import Router from "next/router";
import Link from "next/link";

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
    <div className="bg-black">
      <div className="bg-slate-800 container mx-auto">
        <form onSubmit={submitHandler}>
          <h2 className="text-2xl text-white">Login</h2>
          <input
            name="email"
            type="text"
            placeholder="email"
            className="border-2 border-white rounded-sm"
            onChange={formHandler}
          />
          <br />
          <input
            name="password"
            type="text"
            placeholder="password"
            className="border-2 border-white rounded-sm"
            onChange={formHandler}
          />
          <br />
          <button
            type="submit"
            className="text-white bg-blue-600 px-6 m-4 rounded-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
