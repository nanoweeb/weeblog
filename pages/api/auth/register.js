import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return req.status(401).end();

  const data = req.body;
  const register = await prisma.User.create({
    data,
  });

  res.json(200);
}
