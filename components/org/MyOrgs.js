import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrgs } from '../../store/orgsSlice'
import Link from 'next/link'
import CreateOrgModal from './CreateOrgModal'

export default function MyOrgs() {
  const orgs = useSelector(state => state.orgs)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(fetchOrgs())
  }, [dispatch])

  const addOrg = () => {}

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
      <div className="flex justify-end mr-12">
        <button onClick={() => setShow(true)}>+Create Org</button>
      </div>
      <CreateOrgModal show={show} onClose={() => setShow(false)} />
    </div>
  )
}
