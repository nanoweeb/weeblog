import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users = await prisma.User.findMany();

  return {
    props: { data: users },
  };
}

export default function Home({ data }) {
  return (
    <div>
      <h1>data</h1>
      {data.map((u) => {
        return <p>{u.email}</p>;
      })}
    </div>
  );
}
