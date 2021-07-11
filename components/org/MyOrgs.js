import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrgs } from '../../store/orgsSlice'

export default function MyOrgs() {
  const orgs = useSelector(state => state.orgs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrgs())
  }, [])

  return (
    <div>
      <h1>List of my orgs</h1>
      {orgs.map(org => (
        <div key={org.orgId}>{org.org.name}</div>
      ))}
    </div>
  )
}
