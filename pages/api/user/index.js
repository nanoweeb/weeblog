const prisma = new PrismaClient();

export default async function handler(req, res) {
  const user = await prisma.User.findMany();
  res.json(user);
  console.log(user);
}
