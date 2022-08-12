import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).end();

  const { id } = req.query;

  const post = await prisma.Post.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(200);
}
