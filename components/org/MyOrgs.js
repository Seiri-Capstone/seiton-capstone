import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrgs } from '../../store/orgsSlice'
import Link from 'next/link'
import CreateOrgModal from './CreateOrgModal'
import Logo from '../../components/Logo'

export default function MyOrgs() {
  const orgs = useSelector(state => state.orgs)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  console.log('orgs', orgs)
  useEffect(() => {
    dispatch(fetchOrgs())
  }, [dispatch])

  const bgColors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500']
  const borderColors = [
    'border-blue-500',
    'border-indigo-500',
    'border-purple-500'
  ]

  return (
    <div>
      <Logo />
      <h1 id="tenor">My Organizations</h1>
      <div>
        <button onClick={() => setShow(true)}>+ Create Org</button>
      </div>

      <CreateOrgModal show={show} onClose={() => setShow(false)} />
      <br />
      {orgs?.map((org, i) => (
        <>
          <Link href={`/orgs/${org.id}`} key={org.id}>
            <a>
              <div className=" w-full lg:max-w-full lg:flex">
                <div
                  className={`h-48 lg:h-auto lg:w-12 flex-none rounded-t ${
                    bgColors[i % 3]
                  } lg:rounded-t-none lg:rounded-l text-center overflow-hidden`}
                ></div>
                <div
                  className={`w-full border-r-4 border-b-4 border-l-4 ${
                    borderColors[i % 3]
                  } lg:border-l-0 lg:border-t-4 lg:${
                    borderColors[i % 3]
                  } bg-white
                  } rounded-b lg:rounded-b-none lg:rounded-r p-8 flex flex-col justify-between leading-normal`}
                >
                  <div>
                    <div
                      id="tenor"
                      className="text-gray-900 font-bold text-4xl mb-2 capitalize"
                    >
                      {org.name}
                    </div>

                    <b className="text-2xl leading-loose tracking-wide ml-4">
                      Projects:
                    </b>
                    <br />
                    <p className="text-lg tracking-wide ml-4">
                      {org.projects.length
                        ? org.projects.map(project => (
                            <>
                              • {project.name} <br />
                            </>
                          ))
                        : 'Currently no projects are under this organization.'}
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
  )
}
