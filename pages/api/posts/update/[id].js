import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "PUT") return req.status(405);

  const { id } = req.query;
  const { title, content, endpoint } = req.body;

  const update = await prisma.Post.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      content: content,
      endpoint: endpoint,
    },
  });

  res.status(200);
  res.json({
    message: "data successfully updated",
  });
}
