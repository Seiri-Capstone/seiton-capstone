import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import prisma from '../../../prisma/prisma'
// import { NextApiHandler } from 'next'

export default (req, res) => NextAuth(req, res, options)

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.Auth0({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      domain: process.env.AUTH0_DOMAIN
    })
    // Providers.Email({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM
    // })
  ],
  // session: {
  //   jwt: true
  // },
  // jwt: {
  //   secret: '5a6e2a2cf7169da9eea17587421ee890', //use a random secret token here
  //   encryption: true
  // },
  adapter: Adapters.Prisma.Adapter({ prisma })
  // secret: process.env.SECRET
}
