import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
const ProjectBoard = dynamic(import('../../../components/project/ProjectBoard'))
import Pusher from 'pusher-js'

const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
  cluster: 'us2', // based on my website
  authEndpoint: `/api/pusher/auth`, // make sure to change in production
  auth: { params: { username: 'sey' } } // not important rn? only to show user
})

const Project = () => {
  return (
    <div>
      <ProjectBoard pusher={pusher} />
      <div id="modal"></div>
    </div>
  )
}

export default Project
