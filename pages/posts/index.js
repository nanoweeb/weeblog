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
    <div>
      <h1>Posts</h1>
      {data.map((p) => {
        return (
          <div key={p.id}>
            <h1>{p.title}</h1>
            <p>{p.content}</p>
            <a href={"./posts/" + p.endpoint}>read more</a>
          </div>
        );
      })}
    </div>
  );
}
