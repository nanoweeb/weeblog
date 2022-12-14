import Router from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import toast, { Toaster } from "react-hot-toast";

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
    thumbnail: "",
    title: "",
    content: "",
    endpoint: "",
  });

  async function sendPost(e) {
    e.preventDefault();

    const createReq = await toast.promise(
      fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }),
      {
        loading: "Creating...",
        success: "Created Successfully",
        error: "Failed to create",
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

    Router.push("/admin/dashboard");
  }

  useEffect(() => {});

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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlerFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setFormData({
      ...formData,
      thumbnail: base64,
    });
  };

  return (
    <Layout>
      <div className="w-full h-full bg-[#1d2b4d] pb-10">
        <main className="max-w-[1000px] px-5 mx-auto pt-6 ">
          <h1 className="bg-gradient-to-r bg-clip-text text-transparent from-[#24a4a7] to-indigo-600 text-2xl font-semibold mb-10">
            Create a new posts
          </h1>

          <form onSubmit={sendPost} className="flex flex-col text-gray-600">
            <input
              type="file"
              onChange={handlerFileUpload}
              className="block w-full mb-2 text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-gray-50 hover:file:bg-sky-500"
            />
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
              className="mt-2 py-2 text-gray-100 rounded-lg bg-sky-600 px-12"
            >
              send
            </button>
            <Toaster />
          </form>
        </main>
      </div>
    </Layout>
  );
}
