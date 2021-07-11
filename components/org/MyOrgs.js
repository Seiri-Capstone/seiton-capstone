import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrgs } from '../../store/orgsSlice'
import Link from 'next/link'

export default function MyOrgs() {
  const orgs = useSelector(state => state.orgs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrgs())
  }, [dispatch])

  return (
    <div>
      <h1>List of my orgs</h1>
      {orgs.map(org => (
        <Link href={`/orgs/${org.orgId}`} key={org.orgId}>
          <a>
            <div>{org.org.name}</div>
          </a>
        </Link>
      ))}
    </div>
  )
}
