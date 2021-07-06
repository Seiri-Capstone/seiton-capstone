import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

// https://swr.vercel.app/getting-started

export default function ClientSide() {
  const { data, error } = useSWR('/api/user', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>Loading...</div>
  return <div>Hello {data.name}!</div>
}
