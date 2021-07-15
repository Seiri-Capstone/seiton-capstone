import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  fetchSingleOrg,
  createProject,
  fetchRemoveUserOrg
} from '../../store/orgSlice'
import { fetchDeletedOrg } from '../../store/orgsSlice'
import Link from 'next/link'

export default function Org() {
  const org = useSelector(state => state.org) || {}
  const dispatch = useDispatch()
  const router = useRouter()
  const { query = {} } = router || {}
  const { id = 0 } = query || {}
  const [name, setName] = useState('')

  /* https://stackoverflow.com/questions/62716657/how-can-i-ensure-that-the-next-js-router-query-is-not-undefined */
  useEffect(() => {
    if (id) {
      ;(async () => {
        dispatch(fetchSingleOrg(id))
      })()
    }
  }, [dispatch, id])

  const addProject = e => {
    e.preventDefault()
    dispatch(createProject({ name: name, orgId: id }))
  }

  const deleteOrg = () => {
    dispatch(fetchDeletedOrg(id))
    router.push('/orgs')
  }

  const removeUser = userId => {
    const body = { userId: userId, orgId: id }
    dispatch(fetchRemoveUserOrg(body))
  }

  console.log('single org', org.users)
  //workaround to solve the empty query on initial render
  if (org.projects === undefined) return null

  return (
    <React.Fragment>
      <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mt-8">
        {org.name}
      </h1>
      <div>
        <h1>Projects</h1>
        {org.projects.map(project => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <a>
              <h1>{project.name}</h1>
            </a>
          </Link>
        ))}
      </div>
      <div>
        <h1>Organization Members</h1>
        {org.users.map(user => (
          <div key={user.userId} className="flex mt-2 mr-12">
            <h1 key={user.userId}>{user.user.name}</h1>

            <button
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded-full"
              onClick={() => removeUser(user.userId)}
            >
              X
            </button>
          </div>
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
      <div className="flex justify-end mt-2 mr-12">
        <button
          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          onClick={deleteOrg}
        >
          Delete Organization
        </button>
      </div>
    </React.Fragment>
  )
}
