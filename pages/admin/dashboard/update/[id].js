import Layout from "../../../../components/Layout";
import { useState } from "react";
import Router from "next/router";
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getServerSideProps(req, res) {
  const { id } = req.query;

  const detailRes = await prisma.Post.findMany({
    where: { id: Number(id) },
  });

  const postId = detailRes.map((post) => post.id);

  return {
    props: {
      detail: JSON.parse(JSON.stringify(detailRes)),
      postId: postId.toString(),
    },
  };
}

export default function Update({ detail, postId }) {
  const [fields, setFields] = useState({
    title: detail.title,
    content: detail.content,
  });

  async function handlerSubmit(e) {
    e.preventDefault();

    const updateReq = await fetch("/api/posts/update/" + postId[0], {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const updateRes = await updateReq.json();

    Router.push("/dashboard");
  }

  function fieldsHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    setFields({
      ...fields,
      [name]: value,
    });
  }

  const handleQuill = (value) => {
    setFields((prev) => {
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
    setFields({
      ...fields,
      thumbnail: base64,
    });
  };

  return (
    <Layout>
      {detail.map((d) => {
        return (
          <div key={d.id} className="w-full h-full bg-[#0F172A] py-20">
            <main className="max-w-[1000px] px-5 mx-auto pt-6 ">
              <h1 className="bg-gradient-to-r bg-clip-text text-transparent from-[#24a4a7] to-indigo-600 text-2xl font-semibold mb-10">
                Edit Post
              </h1>

              <form
                onSubmit={handlerSubmit}
                className="flex flex-col text-gray-600"
              >
                <input
                  type="file"
                  onChange={handlerFileUpload}
                  className="block w-full mb-2 text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-sky-600 file:text-gray-50 hover:file:bg-sky-500"
                />

                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  onChange={fieldsHandler}
                  defaultValue={d.title}
                  className="mb-2 bg-slate-50 rounded-lg p-2"
                />
                <br />

                <ReactQuill
                  name="content"
                  onChange={handleQuill}
                  className="h-64 overflow-hidden rounded-lg text-black bg-slate-50 mb-2"
                  theme="snow"
                  defaultValue={d.content}
                  modules={modules}
                  formats={formats}
                />

                <button
                  type="submit"
                  className="py-2 text-gray-200 rounded-lg bg-sky-600 px-12"
                >
                  send
                </button>
              </form>
            </main>
          </div>
        );
      })}
    </Layout>
  );
}
