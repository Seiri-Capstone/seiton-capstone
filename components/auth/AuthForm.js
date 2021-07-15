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
      <div className="ml-12 absolute top-20 right-20 z-0">
        <Image src={img} alt="illustration" width={600} height={600} />
      </div>
      <div className="container mx-auto relative z-20">
        <div className="pt-64">
          <h1>Organize your workflow.</h1>
          <h4 className="max-w-2xl">
            Inspired by the 5S of Japanese workplace organization methodology,
            Seiton will help you and your team to arrange your workflow
            efficiently.
          </h4>

          <br />
          <br />
          {/* <button
            type="submit"
            className="largeButton mr-4"
            onClick={() => signIn('github')}
          >
            Github Sign in
          </button> */}
          {/* github button needs to be taken out for production build */}
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
