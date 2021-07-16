import React, { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import img from '../../public/illustration.svg'

export default function AuthForm() {
  const [session] = useSession()
  const router = useRouter()

  if (session) {
    router.push('/orgs')
  }

  return (
    <>
      <div id="logo" className="pl-8 pt-4 p-4 bg-white ">
        Seiton
      </div>
      <div className="ml-4 xl:ml-12 flex flex-col xl:absolute xl:top-10 xl:right-10">
        <Image src={img} alt="illustration" width={750} height={600} />
      </div>
      <div className="container mx-auto relative">
        <div className="my-10 pl-12 xl:pl-0 xl:pt-64">
          <h1>Organize your workflow.</h1>
          <br />
          <h4 className="max-w-md lg:max-w-lg">
            Inspired by the 5S of Japanese workplace organization methodology,
            Seiton (Japanese for to organize and put in place) will help you and
            your team to arrange your workflow efficiently.
          </h4>

          <br />
          {/* <button
            type="submit"
            className="largeButton mr-4"
            onClick={() => signIn('github')}
          >
            Github Sign in
          </button> */}
          <button
            type="submit"
            className="largeButton"
            onClick={() => signIn('google')}
          >
            Google Sign In
          </button>
        </div>
      </div>
    </>
  )
}
