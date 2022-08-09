import Link from "next/link";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const posts = await prisma.Post.findMany();

  return {
    props: { data: posts },
  };
}

export default function Posts({ data }) {
  return (
    <div className="w-full">
      <div className="max-w-[1000px] px-5">
        <main>
          <h1 className="text-2xl text-gray-200 font-semibold mb-10">
            Weeblog
          </h1>
          <article>
            {data.map((p) => {
              return (
                <div
                  key={p.id}
                  className="h-32 flex justify-between shadow-md mb-6 p-5 border-l-4 border-[#066163]"
                >
                  <div>
                    <h1 className="text-lg font-semibold text-gray-200">
                      {p.title}
                    </h1>
                    <p className="text-xs text-gray-400">{p.content}</p>
                    <Link href={"/posts/detail/" + p.endpoint}>
                      <a className="text-gray-200 text-sm">Read More</a>
                    </Link>
                  </div>
                  <div className="w-20 bg-slate-300 rounded-xl">image</div>
                </div>
              );
            })}
          </article>
        </main>
      </div>
    </div>
  );
}
