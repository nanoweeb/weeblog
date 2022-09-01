import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Link from "next/link";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getStaticProps() {
  const req = await prisma.Post.findMany();

  return {
    props: { posts: JSON.parse(JSON.stringify(req)) },
  };
}

function limit(string = "", limit = 60) {
  return string.substring(0, limit) + "...";
}

export default function Home({ posts }) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  return (
    <Layout>
      <div className="w-full bg-[#0F172A] pb-24">
        <main className="max-w-[1000px] h-full text-gray-200 bg-[#0F172A] pt-20 px-5 mx-auto">
          {/* featured post */}
          <h2 className="text-2xl text-gray-400 font-bold">Recomendation</h2>
          <article className="flex justify-between mt-5 mb-20">
            <div className="h-80 w-[40rem] rounded-lg bg-slate-700 overflow-hidden">
              <img src="/hutao.png" alt="" />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-gray-400">
                Gaming <span className="px-2">•</span> 31 August 2022
              </p>
              <h1 className="w-72 text-xl font-semibold">
                Understanding color theory: the color wheel and finding
                complementary colors
              </h1>
              <p className="w-72 text-gray-400">
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco cillum dolor. Voluptate exercitation incididunt aliquip
                deserunt reprehenderit elit laborum.{" "}
              </p>
            </div>
          </article>

          {/* common post */}
          <div className="grid grid-cols-3 gap-10">
            {posts.map((post) => {
              return (
                <Link href={"/detailPost/" + post.endpoint}>
                  <a>
                    <div key={post.id} className="w-72 space-y-2">
                      <img
                        src={post.thumbnail}
                        className="w-full h-36 bg-slate-600 rounded-lg"
                      />
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
                  </a>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </Layout>
  );
}
