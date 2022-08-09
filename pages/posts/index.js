import Link from "next/link";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const posts = await prisma.Post.findMany();

  return {
    props: { data: posts },
  };
}

function limit(string = "", limit = 240) {
  return string.substring(0, limit) + "...";
}

export default function Posts({ data }) {
  return (
    <div className="w-full">
      <div className="max-w-[1000px] px-5 mx-auto">
        <main>
          <h1 className="text-2xl text-gray-200 font-semibold mb-10 ">
            Weeblog
          </h1>
          <article>
            {data.map((p) => {
              return (
                <div
                  key={p.id}
                  className="shadow-md space-y-6 mb-6 p-5 border-l-4 border-[#066163]"
                >
                  <h1 className="text-lg font-semibold text-gray-200 ">
                    {p.title}
                  </h1>
                  <p className="text-gray-400 ">{limit(p.content)}</p>
                  <Link href={"/posts/detail/" + p.endpoint}>
                    <a className="text-gray-200 text-xs">Read More</a>
                  </Link>
                </div>
              );
            })}
          </article>
        </main>
      </div>
    </div>
  );
}
