import { PrismaClient } from "@prisma/client";
import Layout from "../../components/Layout";
import Image from "next/image";

const prisma = new PrismaClient();

export async function getServerSideProps(req, res) {
  const { slug } = req.query;

  const detail = await prisma.Post.findMany({
    where: { endpoint: slug },
  });

  return {
    // di parse supaya timestamps nya bisa terbaca
    props: { detail: JSON.parse(JSON.stringify(detail)) },
  };
}

export default function detail({ detail }) {
  return (
    <Layout>
      <div className="w-full bg-[#0F172A] pt-20">
        <main className="max-w-[1000px] px-5 mx-auto pt-6 text-white">
          <article>
            {detail.map((d) => {
              return (
                <div key={d.id} className="h-screen">
                  <div className="mb-5">
                    <Image
                      src={d.thumbnail}
                      width="1000px"
                      height="500"
                      alt={d.title}
                    />
                  </div>
                  <h1 className="text-3xl font-semibold text-center mb-10">
                    {d.title}
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{ __html: d.content }}
                    className="text-gray-400 text-lg"
                  ></div>
                </div>
              );
            })}
          </article>
        </main>
      </div>
    </Layout>
  );
}
