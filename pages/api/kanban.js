import prisma from "../../prisma";

export default async function handle(req, res) {
  const { id } = req.body;
  const result = await prisma.get({ where: { id } });
  res.json(result);
}
