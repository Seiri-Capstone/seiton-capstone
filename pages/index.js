import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { tw } from 'twind'

export default function Home() {
  return (
    <div className={tw`flex flex-col justify-center h-screen bg-gray-100`}>
      <Head>
        <title>Seiton</title>
        <meta name="description" content="A Kanban for Pros" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/project">
        <h1 className={tw`text(8xl red-800 center) font-bold`}>Seiton</h1>
      </Link>
    </div>
  )
}
