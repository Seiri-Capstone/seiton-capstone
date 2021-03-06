import Head from 'next/head'
import AuthForm from '../components/auth/AuthForm'

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-blue-100">
      <Head>
        <title>Seiton</title>
        <meta name="description" content="A Kanban for Pros" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthForm />
    </div>
  )
}
