import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjects } from '../../store/projectsSlice'
import Link from 'next/link'
import Logo from '../../components/Logo'

export default function MyProjects() {
  const projects = useSelector(state => state.projects)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  console.log('projects--->', projects)

  const bgColors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500']
  const borderColors = [
    'border-blue-500',
    'border-indigo-500',
    'border-purple-500'
  ]

  return (
    <div>
      <Logo />
      <h2 id="tenor">My Projects</h2>
      <br />
      {projects?.map((project, i) => (
        <>
          <Link href={`/projects/${project.projectId}`}>
            <a>
              <div
                className="w-full lg:max-w-full lg:flex"
                key={project.projectId}
              >
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
                  } rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal`}
                >
                  <div
                    id="tenor"
                    className="text-gray-900 font-bold text-xl mb-2 capitalize tracking-wide"
                  >
                    {project.project.name}
                  </div>
                  <div className="text-base tracking-wide ml-4">
                    Organization: {project.project.org.name}
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
