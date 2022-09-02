import { useState, useEffect } from "react";
import Link from "next/link";
import { MdArticle, MdEdit, MdDelete } from "react-icons/md";
import Layout from "../../components/Layout";
import Router from "next/router";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const posts = await prisma.Post.findMany({});

  return {
    // di parse supaya timestamps nya bisa terbaca
    props: { data: JSON.parse(JSON.stringify(posts)) },
  };
}

function limit(string = "", limit = 100) {
  return string.substring(0, limit) + "...";
}

export default function Posts({ data }) {
  const [postState, setPostState] = useState(data);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  async function deletePost(id) {
    const ask = confirm("Are you sure want to delete this post ?");
    if (ask === true) {
      await fetch(`/api/posts/delete/${id}`, {
        method: "DELETE",
      });

      const postFiltered = postState.filter((post) => post.id !== id && post);
      setPostState(postFiltered);
    }
  }

  function editPost(id) {
    Router.replace(`/dashboard/update/${id}`);
  }

  return (
    <Layout>
      <div className="w-full bg-[#0F172A] pt-16">
        <div className="max-w-[1000px] px-5 mx-auto py-10">
          <main>
            <h1 className="bg-gradient-to-r bg-clip-text text-transparent from-[#24a4a7] to-indigo-600 text-xl font-semibold mb-10">
              Weeblog Posts
            </h1>
            <article>
              {postState.map((post) => {
                return (
                  <div
                    key={post.id}
                    className="shadow-md space-y-6 mb-6 p-4 border-l-4 border-[#066163]"
                  >
                    <h1 className="text-lg font-semibold text-gray-200 ">
                      {post.title}
                    </h1>
                    <time className="text-gray-400 text-xs">
                      {post.createdAt}
                    </time>
                    <typography
                      dangerouslySetInnerHTML={{
                        __html: render && limit(post.content),
                      }}
                      className="text-gray-400"
                    ></typography>

                    {/* button */}
                    <div className="w-24 flex items-center gap-2 text-xl text-white">
                      <Link href={"/dashboard/detail/" + post.endpoint}>
                        <a className="text-gray-200">
                          <MdArticle />
                        </a>
                      </Link>
                      <button onClick={editPost.bind(this, post.id)}>
                        <MdEdit />
                      </button>
                      <button onClick={deletePost.bind(this, post.id)}>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                );
              })}
            </article>
          </main>
        </div>
      </div>
    </Layout>
  );
}
