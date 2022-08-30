import Router from "next/router";
import { useState } from "react";
import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

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

    Router.push("/admin/dashboard");
  }

  function formHandler(e) {
    const value = e.target.value;
    const name = e.target.name;

    //limit endpoint ben ra iso ke luwihen
    const getEndpoint = e.target.value.replace(/\s/g, "-");

    function limit(string = "", limit = 40) {
      return string.substring(0, limit);
    }

    const endpoint = limit(getEndpoint);

    setFormData({
      ...formData,
      [name]: value,

      endpoint: endpoint,
    });
  }

  const handleQuill = (value) => {
    setFormData((prev) => {
      return {
        ...prev,
        content: value,
      };
    });
  };
  return (
    <Layout>
      <div className="w-full h-full bg-[#0F172A] pb-10">
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
              className="mb-2 bg-slate-50 rounded-lg p-2"
            />
            <ReactQuill
              name="content"
              onChange={handleQuill}
              className="h-64 overflow-hidden rounded-lg text-black bg-slate-50"
              theme="snow"
              value={formData.content}
              modules={modules}
              formats={formats}
            />

            <button
              type="submit"
              className="mt-2 py-2 text-gray-200 rounded-lg bg-sky-600 px-12"
            >
              send
            </button>
          </form>
        </main>
      </div>
    </Layout>
  );
}
