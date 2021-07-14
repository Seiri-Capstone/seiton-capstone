import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import prisma from '../../../prisma/prisma'
// import { NextApiHandler } from 'next'
import axios from 'axios'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    // Providers.Credentials({
    //   name: 'Credentials',
    // currently not hooked up to the database
    // need axios here in order to do so
    // ref: https://dev.to/twisha/using-credentials-provider-with-a-custom-backend-in-nextauth-js-43k4
    // credentials: {
    //   name: { label: 'Name', type: 'text', placeholder: 'Name' },
    //   email: { label: 'Email', type: 'text', placeholder: 'Email' },
    //   password: { label: 'Password', type: 'password' }
    // },
    // async authorize(credentials, req) {
    //   console.log(credentials)
    //   const user = { name: credentials.name, email: credentials.email }

    //   if (user) {
    // Any object returned will be saved in `user` property of the JWT
    // return user
    // } else {
    // If you return null or false then the credentials will be rejected
    // return null
    // You can also Reject this callback with an Error or with a URL:
    // throw new Error('error message') // Redirect to error page
    // throw '/path/to/redirect'        // Redirect to a URL
    // }
    //   }
    // }),
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
    //   server: {
    //     port: 465,
    //     // change to port 465 after deployment
    //     host: 'smtp.gmail.com',
    //     secure: true,
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD
    //     },
    //     tls: {
    //       rejectUnauthorized: false
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // })
  ],
  callbacks: {
    redirect: async (url, _) => {
      if (url === '/') {
        return Promise.resolve('/orgs')
      }
      return Promise.resolve('/')
    },
    session: async (session, user) => {
      session.userId = user.id
      session.username = user.username
      console.log('⭕ SESSION CALLBACK!', session, 'user!!!', user)
      return Promise.resolve(session)
    }
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  jwt: {
    secret: process.env.SECRET, //use a random secret token here
    encryption: true
  },
  database: process.env.DATABASE_URL
  // adapter: Adapters.Prisma.Adapter({ prisma })
}

export default (req, res) => NextAuth(req, res, options)
