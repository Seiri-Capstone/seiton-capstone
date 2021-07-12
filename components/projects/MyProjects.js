import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProjects } from '../../store/projectsSlice'
import Link from 'next/link'

export default function MyProjects() {
  const projects = useSelector(state => state.projects)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  console.log('projects--->', projects)

  return (
    <div>
      <h1>List of my Projects</h1>
      {projects.map(project => (
        <Link href={`/projects/${project.projectId}`} key={project.projectId}>
          <a>
            <div>{project.project.name}</div>
          </a>
        </Link>
      ))}
    </div>
  )
}
