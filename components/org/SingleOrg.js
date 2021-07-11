import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchSingleOrg } from '../../store/orgSlice'

export default function MyOrgs() {
  const org = useSelector(state => state.org) || {}
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  console.log('id', id)

  useEffect(() => {
    dispatch(fetchSingleOrg(1))
  }, [])

  console.log('single org projects', org.projects)
  console.log('single org users', org.users)
  //workaround to solve the empty query on initial render

  if (org.projects === undefined) return null

  return (
    <React.Fragment>
      <div>
        <h1>projects</h1>
        {org.projects.map(project => (
          <h1 key={project.id}>{project.name}</h1>
        ))}
      </div>
      <div>
        <h1>Org Members</h1>
        {org.users.map(user => (
          <h1 key={user.userId}>{user.user.name}</h1>
        ))}
      </div>
    </React.Fragment>
  )
}
