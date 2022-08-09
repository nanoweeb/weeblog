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
    <div>
      <h1>detail</h1>
      {detail.map((d) => {
        return (
          <div>
            <h1>{d.title}</h1>
            <p>{d.content}</p>
          </div>
        );
      })}
    </div>
  );
}
