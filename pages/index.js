import Head from 'next/head'
import AuthForm from '../components/auth/AuthForm'
import { tw } from 'twind'

export default function Home() {
  return (
    <div className={tw`flex flex-col justify-center h-screen bg-gray-100`}>
      <Head>
        <title>Seiton</title>
        <meta name="description" content="A Kanban for Pros" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthForm />
    </div>
  )
}
