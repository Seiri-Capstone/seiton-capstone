import * as React from 'react'
import { useGetProjectQuery } from '../store/apiSlice'

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetProjectQuery(1)

  if (error) return <div>Error!</div>
  if (isLoading) return <div>Loading!</div>
  if (data) return <div>{JSON.stringify(data)}</div>
  // render UI based on data and loading state
}
