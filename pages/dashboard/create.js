import Router from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";

export default function Create() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    endpoint: "",
  });

  async function sendPost(e) {
    e.preventDefault();
    const createReq = await fetch("/api/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const createRes = await createReq.json();

    Router.push("/dashboard");
  }

  function formHandler(e) {
    const value = e.target.value;
    const name = e.target.name;

    //limit endpoint ben ra iso ke luwihen
    const getEndpoint = e.target.value.replace(/\s/g, "-");

    function limit(string = "", limit = 40) {
      return string.substring(0, limit);
    }
    //dadi iki sing di set nk endpoint random, iso title iso content, carane dewe dewe ra reti aku ketoke kudune nggo query selector nk from input e ning drung tak jajal

    const endpoint = limit(getEndpoint);

    setFormData({
      ...formData,
      [name]: value,
      endpoint: endpoint,
    });
  }

  return (
    <Layout>
      <div className="w-full h-screen bg-[#0F172A] pb-10">
        <main className="max-w-[1000px] px-5 mx-auto pt-6 ">
          <h1 className="bg-gradient-to-r bg-clip-text text-transparent from-[#24a4a7] to-indigo-600 text-2xl font-semibold mb-10">
            Create a new posts
          </h1>

          <form onSubmit={sendPost} className="flex flex-col p-2 text-gray-200">
            <input
              name="title"
              type="text"
              placeholder="Title"
              onChange={formHandler}
              className="mb-2 bg-gray-700 rounded-lg p-2"
            />
            <br />
            <textarea
              name="content"
              placeholder="content"
              onChange={formHandler}
              className="h-24 mb-2 bg-gray-700 rounded-lg p-2"
            ></textarea>

            <button
              type="submit"
              className="py-2 text-gray-200 rounded-lg bg-sky-600 px-12"
            >
              send
            </button>
          </form>
        </main>
      </div>
    </Layout>
  );
}