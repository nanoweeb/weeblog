import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const data = req.body;
  const post = await prisma.Post.create({
    data,
  });

  res.json(200);
}
