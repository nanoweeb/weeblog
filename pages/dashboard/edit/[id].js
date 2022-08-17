import Layout from "../../../components/Layout";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getServerSideProps(req, res) {
  const { id } = req.query;

  const detailRes = await prisma.Post.findMany({
    where: { id: Number(id) },
  });

  return {
    props: { detail: JSON.parse(JSON.stringify(detailRes)) },
  };
}

export default function Edit({ detail }) {
  return (
    <Layout>
      {detail.map((d) => {
        return (
          <div className="w-full h-screen bg-[#0F172A] pb-10">
            <main className="max-w-[1000px] px-5 mx-auto pt-6 ">
              <h1 className="bg-gradient-to-r bg-clip-text text-transparent from-[#24a4a7] to-indigo-600 text-2xl font-semibold mb-10">
                Edit Post
              </h1>

              <form key={d.id} className="flex flex-col p-2 text-gray-200">
                <input
                  name="title"
                  type="text"
                  placeholder="Title"
                  defaultValue={d.title}
                  className="mb-2 bg-gray-700 rounded-lg p-2"
                />
                <br />
                <textarea
                  name="content"
                  placeholder="content"
                  defaultValue={d.content}
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
        );
      })}
    </Layout>
  );
}
