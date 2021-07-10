import prisma from '../../../prisma/prisma'

// POST user
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log("we're in the prisma post user route", req.body.user)
      const user = await prisma.user.create({ data: req.body.user })
      res.status(200).json(user)
    } catch (error) {
      console.error('error in post user method!')
    }
  } else if (req.method === 'GET') {
    try {
      console.log("we're in the prisma get user route", req.body.user)
      const user = await prisma.user.findUnique({ data: req.body.user })
      res.status(200).json(user)
    } catch (error) {
      console.error('error in post user method!')
    }
  }
}
