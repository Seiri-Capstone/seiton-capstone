import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrgs, fetchDeletedOrg } from '../../store/orgsSlice'
import Link from 'next/link'
import CreateOrgModal from './CreateOrgModal'
import Logo from '../../components/Logo'
import Image from 'next/image'
import x from '../../public/assets/xIcon.svg'

export default function MyOrgs() {
  const orgs = useSelector(state => state.orgs) || []
  const dispatch = useDispatch()
  // const router = useRouter()
  const [show, setShow] = useState(false)

  console.log('orgs', orgs)
  useEffect(() => {
    dispatch(fetchOrgs())
  }, [dispatch])

  // const deleteOrg = id => {
  //   dispatch(fetchDeletedOrg(id))
  //   router.push('/orgs')
  // }

  const bgColors = ['bg-navyblue', 'bg-skyblue', 'bg-darkblue', 'bg-medblue']
  const borderColors = [
    'border-navyblue',
    'border-skyblue',
    'border-darkblue',
    'border-medblue'
  ]

  return (
    <>
      <Logo />
      <h2 id="tenor">My Organizations</h2>
      <br />
      <div>
        <button onClick={() => setShow(true)}>+ Create New Organization</button>
      </div>

      <CreateOrgModal show={show} onClose={() => setShow(false)} />

      <div className="mt-12 text-skyblue max-w-prose leading-loose">
        {orgs.length === 0 && (
          <>
            <h3 className="leading-loose">
              Currently, you do not belong to any organizations!
            </h3>
            <h4>
              Create a new organization to get started, or check your
              invitations to see if you were invited to an existing
              organization.
            </h4>
          </>
        )}
      </div>

      <div className="h-4/5 overflow-y-auto">
        {orgs?.map((org, i) => (
          <>
            <Link href={`/orgs/${org.id}`} key={org.id}>
              <a className="hover:text-black">
                <div className="w-full lg:max-w-full lg:flex">
                  <div
                    className="w-3/5 lg:w-full shadow-xl bg-white dark:bg-gray-700 dark:hover:border-blue-300 hover:border-yellow-400 hover:border-2
                   rounded-lg p-4 flex flex-col justify-between leading-normal"
                  >
                    <div>
                      <div className="flex justify-between">
                        <div
                          id="tenor"
                          className="text-gray-900 dark:text-gray-100 font-bold text-xl mb-2 capitalize tracking-wider"
                        >
                          {org.name} ({org.projects?.length})
                        </div>
                        <div className="">
                          <Image
                            src={x}
                            alt="deleteIcon"
                            width={24}
                            height={24}
                          />
                        </div>
                      </div>
                      <hr className="border-1 border-skyblue dark:border-gray-500 pb-2"></hr>
                      <p className="text-base dark:text-gray-300 tracking-wide ml-4">
                        {org.projects && org.projects.length
                          ? org.projects.map(project => (
                              <>
                                • {project.name} <br />
                              </>
                            ))
                          : 'Currently there are no projects under this organization.'}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
            <br />
          </>
        ))}
      </div>
    </>
  )
}
