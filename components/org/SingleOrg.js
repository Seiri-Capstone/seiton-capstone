import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { fetchSingleOrg, createProject } from '../../store/orgSlice'

export default function Org() {
  const org = useSelector(state => state.org) || {}
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const [name, setName] = useState('')

  useEffect(() => {
    dispatch(fetchSingleOrg(id))
  }, [dispatch])

  const addProject = e => {
    e.preventDefault()
    dispatch(createProject({ name: name, orgId: id }))
  }

  console.log('single org', org)
  //workaround to solve the empty query on initial render
  if (org.projects === undefined) return null

  return (
    <React.Fragment>
      <div>
        <h1>Organization: {org.name}</h1>
        <h1>Projects</h1>
        {org.projects.map(project => (
          <h1 key={project.id}>{project.name}</h1>
        ))}
      </div>
      <div>
        <h1>Organization Members</h1>
        {org.users.map(user => (
          <h1 key={user.userId}>{user.user.name}</h1>
        ))}
      </div>
      <br />
      {/* add new project, currently a form but we should make into a modal  */}
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
            onClick={addProject}
          >
            Add New Project
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}
