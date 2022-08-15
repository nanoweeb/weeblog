import { useState } from "react";
import Router from "next/router";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function register(e) {
    e.preventDefault();

    const createReq = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const createRes = await createReq.json();

    console.log("register berhasil");
    Router.push("/posts/create");
  }

  function fromHandler(e) {
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
        <form onSubmit={register}>
          <h2 className="text-2xl text-white">Register</h2>
          <input
            name="username"
            type="text"
            placeholder="username"
            className="border-2 border-white rounded-sm"
            onChange={fromHandler}
          />
          <br />
          <input
            name="email"
            type="text"
            placeholder="email"
            className="border-2 border-white rounded-sm"
            onChange={fromHandler}
          />
          <br />
          <input
            name="password"
            type="text"
            placeholder="password"
            className="border-2 border-white rounded-sm"
            onChange={fromHandler}
          />{" "}
          <br />
          <button
            type="submit"
            className="text-white bg-blue-600 px-6 m-4 rounded-sm"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
