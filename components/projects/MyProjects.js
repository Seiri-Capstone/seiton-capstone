import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjects, fetchDeletedProject } from '../../store/projectsSlice'
import Link from 'next/link'
import Logo from '../../components/Logo'
import Image from 'next/image'
import x from '../../public/assets/xIcon.svg'
import DeleteProjectModal from './DeleteProjectModal'

export default function MyProjects() {
  const projects = useSelector(state => state.projects)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const deleteProject = e => {
    e.preventDefault()
    setShow(true)
    // dispatch(fetchDeletedProject(id))
  }

  console.log('projects--->', projects)

  return (
    <>
      <Logo />
      <h2 id="tenor" className="leading-loose">
        My Projects
      </h2>
      <hr className="border-1 border-skyblue dark:border-gray-500 pb-2"></hr>
      <h4 className="mt-4 text-base">
        A list of all your projects across all organizations.
      </h4>
      <div className="mt-8 text-black max-w-prose">
        {projects.length === 0 && (
          <>
            <h4 className="leading-loose dark:text-white">
              Currently, you do not belong to any projects!
            </h4>
            <p className="tracking-wide dark:text-gray-200">
              A new project must be created under an organization. Follow the
              instructions on the organization page to get started. To join an
              existing project, ask a current team mate for an invite!
            </p>
          </>
        )}
      </div>

      <div className="h-5/6 overflow-y-auto">
        {projects?.map((project, i) => (
          <>
            <DeleteProjectModal
              show={show}
              onClose={() => setShow(false)}
              projectId={project.projectId}
            />
            <Link href={`/projects/${project.projectId}`}>
              <a>
                <div
                  className="w-full lg:max-w-full lg:flex"
                  key={project.projectId}
                >
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
                          {project.project.name}
                        </div>
                        <div className="">
                          <Image
                            src={x}
                            alt="deleteIcon"
                            width={24}
                            height={24}
                            onClick={e => deleteProject(e, project.projectId)}
                          />
                        </div>
                      </div>
                      <hr className="border-1 border-skyblue dark:border-gray-500 pb-2"></hr>
                      <div className="text-base tracking-wide dark:text-gray-300 flex justify-between">
                        <span>{project.project.org.name}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {project.project.users.length}{' '}
                          {project.project.users.length > 1
                            ? 'members in project'
                            : 'member in project'}
                        </span>
                      </div>
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
