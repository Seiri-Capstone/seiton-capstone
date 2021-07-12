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
        <div key={project.projectId}>
          <Link href={`/projects/${project.projectId}`}>
            <a>Project Name: {project.project.name}</a>
          </Link>
          {'<-- click to go to this project'}
          <br />
          <Link href={`/orgs/${project.project.orgId}`}>
            <a>Organization:{project.project.org.name}</a>
          </Link>
          {'<-- click to go to this org'}
        </div>
      ))}
    </div>
  )
}
