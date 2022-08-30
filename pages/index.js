import Layout from "../components/Layout";
import { useState, useEffect } from "react";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getStaticProps() {
  const req = await prisma.Post.findMany();

  return {
    props: { posts: JSON.parse(JSON.stringify(req)) },
  };
}

function limit(string = "", limit = 100) {
  return string.substring(0, limit) + "...";
}

export default function Home({ posts }) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <Layout>
      <div className="w-full bg-[#0F172A]">
        <main className="max-w-[1000px] h-full text-gray-200 bg-[#0F172A] pt-20 px-5 mx-auto">
          <h1 className="bg-gradient-to-r bg-clip-text text-transparent from-[#24a4a7] to-indigo-600 text-5xl font-semibold mb-5">
            Weeblog
          </h1>
          <article class="mt-5">
            <div class="relative group">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-[#24a4a7] to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button class="w-full h-32 relative px-7 py-4 bg-[#0c111d] rounded-lg leading-none items-center divide-x divide-gray-600">
                <div>
                  <h1 className="text-gray-200 text-lg"></h1>
                </div>
              </button>
            </div>
          </article>
          <div>
            {posts.map((post) => {
              return (
                <div
                  key={post.id}
                  className="shadow-md space-y-6 gap-10 p-4 border-l-4 border-[#066163]"
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
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </Layout>
  );
}
