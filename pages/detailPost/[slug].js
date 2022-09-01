import { PrismaClient } from "@prisma/client";
import Layout from "../../components/Layout";

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
      <div className="w-full h-screen bg-[#0F172A] pt-20">
        <main className="max-w-[1000px] px-5 mx-auto pt-6 text-white">
          <article>
            {detail.map((d) => {
              return (
                <div key={d.id}>
                  <h1 className="text-xl font-semibold text-center mb-5">
                    {d.title}
                  </h1>
                  <div dangerouslySetInnerHTML={{ __html: d.content }}></div>
                </div>
              );
            })}
          </article>
        </main>
      </div>
    </Layout>
  );
}
