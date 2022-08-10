import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps(req, res) {
  const { slug } = req.query;

  const detail = await prisma.Post.findMany({
    where: { endpoint: slug },
  });

  return {
    props: { detail },
  };
}

export default function detail({ detail }) {
  return (
    <div className="w-full bg-[#0F172A]">
      <main className="max-w-[1000px] px-5 mx-auto pt-6 text-white">
        <article>
          {detail.map((d) => {
            return (
              <div key={d.id}>
                <h1 className="text-xl font-semibold text-center mb-5">
                  {d.title}
                </h1>
                <p className="text-gray-400">{d.content}</p>
              </div>
            );
          })}
        </article>
      </main>
    </div>
  );
}
