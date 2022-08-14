import { useState } from "react";
import Link from "next/link";
import { MdArticle, MdEdit, MdDelete } from "react-icons/md";
import Layout from "../../components/Layout";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const posts = await prisma.Post.findMany();

  return {
    props: { data: posts },
  };
}

function limit(string = "", limit = 100) {
  return string.substring(0, limit) + "...";
}

export default function Posts({ data }) {
  const [postState, setPostState] = useState(data);

  async function deletePost(id) {
    const ask = confirm("Are you sure want to delete this post?");
    if (ask === true) {
      await fetch(`/api/posts/delete/${id}`, {
        method: "DELETE",
      });

      const postFiltered = postState.filter((post) => post.id !== id && post);
      setPostState(postFiltered);
    }
  }

  return (
    <Layout>
      <div className="w-full bg-[#0F172A]">
        <div className="max-w-[1000px] px-5 mx-auto py-10">
          <main>
            <h1 className="bg-gradient-to-r bg-clip-text text-transparent from-[#24a4a7] to-indigo-600 text-xl font-semibold mb-10">
              Weeblog Posts
            </h1>
            <article>
              {postState.map((p) => {
                return (
                  <div
                    key={p.id}
                    className="shadow-md space-y-6 mb-6 p-4 border-l-4 border-[#066163]"
                  >
                    <h1 className="text-lg font-semibold text-gray-200 ">
                      {p.title}
                    </h1>
                    <p className="text-gray-400 ">{limit(p.content)}</p>

                    {/* button */}
                    <div className="w-24 flex items-center gap-2 text-xl text-white">
                      <Link href={"/dashboard/detail/" + p.endpoint}>
                        <a className="text-gray-200">
                          <MdArticle />
                        </a>
                      </Link>
                      <button>
                        <MdEdit />
                      </button>
                      <button onClick={deletePost.bind(this, p.id)}>
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
