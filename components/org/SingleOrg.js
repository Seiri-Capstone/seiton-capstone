import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  fetchSingleOrg,
  createProject,
  fetchRemoveUserOrg
} from '../../store/orgSlice'
import { fetchDeletedOrg } from '../../store/orgsSlice'
import Link from 'next/link'
import Logo from '../../components/Logo'
import { fetchCreateInvite } from '../../store/invitationsSlice'
import { toast } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'

export default function Org() {
  const org = useSelector(state => state.org) || {}
  const dispatch = useDispatch()
  const router = useRouter()
  const { query = {} } = router || {}
  const { id = 0 } = query || {}
  const [name, setName] = useState('')
  const [showProj, setShowProj] = useState(false)
  const [showInvite, setShowInvite] = useState(false)
  const [searchEmail, setSearchEmail] = useState('')
  const [session] = useSession()

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
    setShowProj(false)
  }

  const deleteOrg = () => {
    dispatch(fetchDeletedOrg(id))
    router.push('/orgs')
  }

  const removeUser = userId => {
    const body = { userId: userId, orgId: id }
    dispatch(fetchRemoveUserOrg(body))
  }

  const notify = () => {
    typeof window !== 'undefined' ? injectStyle() : null
    toast.configure()
    toast('Invitation sent !')
  }

  const handleSend = e => {
    e.preventDefault()
    const thunkArg = {
      receivedBy: null,
      projectId: null,
      orgId: org.id,
      searchEmail: searchEmail
    }
    dispatch(fetchCreateInvite(thunkArg))
    setShowInvite(false)
    notify()
  }

  //workaround to solve the empty query on initial render
  if (org.projects === undefined) return null

  console.log('org', org)
  const createdDate = String(new Date(org.createdAt)).substring(3, 15)

  return (
    <React.Fragment>
      <Logo />
      <h2 id="tenor" className="capitalize leading-loose">
        {org.name}
      </h2>
      <hr className="border-1 border-skyblue dark:border-gray-500 pb-2"></hr>
      <div className="flex justify-between">
        <span className="dark:text-gray-400">Created on {createdDate}</span>

        <button
          className=" text-red-600 dark:text-red-300 text-sm"
          onClick={deleteOrg}
        >
          Delete Organization
        </button>
      </div>

      <div className="flex mt-12">
        <div className="rounded-lg bg-transparent border border-skyblue dark:border-gray-500 p-8 w-1/3 mr-8">
          <div>
            <h4 id="tenor" className="pb-2">
              Organization Members
            </h4>
            <hr className=" border-skyblue dark:border-gray-500 pt-2"></hr>
            <button
              type="submit"
              className="text-sm pb-4"
              onClick={() => setShowInvite(!showInvite)}
            >
              + Add New Member
            </button>

            {showInvite && (
              <div>
                <form className="max-w-full mx-auto rounded-lg flex flex-col">
                  <input
                    className="w-full p-3 py-1 text-gray-700 dark:text-gray-300 border rounded-lg mb-3 shadow-sm"
                    placeholder="Search by Email"
                    onChange={e => setSearchEmail(e.target.value)}
                  ></input>
                  <button
                    type="submit"
                    className="bg-skyblue dark:bg-gray-600 text-white hover:bg-navyblue dark:text-gray-300 rounded-lg dark:hover:bg-skyblue p-4 py-1 mb-4 text-base shadow-sm"
                    onClick={handleSend}
                  >
                    Send Invite
                  </button>
                </form>
              </div>
            )}

            {org.users.map(user => (
              <div key={user.userId} className="flex pl-4">
                <span
                  key={user.userId}
                  className="capitalize tracking-wide leading-relaxed"
                >
                  - {user.user.name}
                </span>
                {/* conditional logic to only show remove if the name listed is not current user */}
                {Number(session.user.sub) !== user.userId && (
                  <button
                    className="text-red-600 dark:text-red-300 pl-2 text-sm"
                    onClick={() => removeUser(user.userId)}
                  >
                    {'(remove)'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white dark:bg-gray-700 p-8 w-2/3">
          <h4 id="tenor" className="pb-2">
            Current Projects
          </h4>
          <hr className="border-skyblue dark:border-gray-500 pt-2"></hr>
          <button
            type="submit"
            className="text-sm pb-4"
            onClick={() => setShowProj(!showProj)}
          >
            + Add New Project
          </button>

          {showProj && (
            <div>
              <form className="px-2 max-w-full mx-auto rounded-lg">
                <input
                  className="w-2/3 p-3 py-1 text-gray-700 dark:text-gray-300 border rounded-lg mb-3 shadow-sm"
                  placeholder="Project Name"
                  onChange={e => setName(e.target.value)}
                ></input>
                <button
                  type="submit"
                  className="bg-skyblue dark:bg-gray-600 text-white hover:bg-navyblue dark:text-gray-300 rounded-lg dark:hover:bg-skyblue p-4 py-1 ml-4 text-base shadow-sm"
                  onClick={addProject}
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          <div className="flex flex-col ml-4">
            {org.projects.length === 0 && (
              <span className="text-base text-gray-600 dark:text-gray-400 max-w-prose tracking-wide">
                Currently, there are no projects in this organization. <br />
                Click the button above to create a new project!
              </span>
            )}
            {org.projects.map(project => (
              <Link href={`/projects/${project.id}`} key={project.id}>
                <a>
                  <span className="capitalize tracking-wide leading-relaxed hover:text-skyblue dark:hover:text-blue-300">
                    - {project.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 pl-2 text-sm italic">
                    {`(last updated on ${String(
                      new Date(project.updatedAt)
                    ).substring(3, 15)})`}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
