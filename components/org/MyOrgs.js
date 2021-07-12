import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrgs, createOrg } from '../../store/orgsSlice'
import Link from 'next/link'

export default function MyOrgs() {
  const orgs = useSelector(state => state.orgs)
  const dispatch = useDispatch()

  const [name, setName] = useState('')

  useEffect(() => {
    dispatch(fetchOrgs())
  }, [dispatch])

  const addOrg = e => {
    e.preventDefault()
    dispatch(createOrg({ name: name }))
  }

  return (
    <div>
      <h1>List of my organizations</h1>
      {orgs.map(org => (
        <Link href={`/orgs/${org.orgId}`} key={org.orgId}>
          <a>
            <div>{org.org.name}</div>
          </a>
        </Link>
      ))}
      <br />
      {/* add new org, currently a form but we should make into a modal  */}
      <div>
        <form className="p-4 my-3 max-w-3xl mx-auto space-y-6 rounded-lg">
          <label>
            Name:
            <input
              className="w-full p-3 py-2 text-gray-700 border rounded-lg focus:outline-none rows=4 mb-3 focus:outline-none"
              onChange={e => setName(e.target.value)}
            ></input>
          </label>
          <button
            type="submit"
            className="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 p-4 py-2 focus:outline-none"
            onClick={addOrg}
          >
            Add New Organization
          </button>
        </form>
      </div>
    </div>
  )
}
