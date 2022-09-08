import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, email, password } = req.body;

  const checkUser = await prisma.User.findFirst({
    where: {
      email: email,
    },
  });
  if (!checkUser) {
    return res.status(401).end();
  }

  const checkPassword = await prisma.User.findFirst({
    where: {
      password: password,
    },
  });
  if (!checkPassword) {
    return res.status(401).end();
  }

  const token = jwt.sign(
    {
      email: checkUser.email,
      password: checkUser.password,
    },
    "secret123",
    {
      expiresIn: "1h",
    }
  );

  res.status(200);
  res.json({
    message: "login berhasil",
    token,
  });
}
