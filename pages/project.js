import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
const ProjectBoard = dynamic(import('../components/project/ProjectBoard'))
import Pusher from 'pusher-js'

const Project = () => {
  // const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
  //   cluster: 'us2', // based on my website
  //   authEndpoint: `/api/pusher/auth`, // make sure to change in production
  //   auth: { params: { username: 'helen' } }
  // })

  // useEffect(() => {
  //   console.log(`🟢  useEffect for Chat.js running!`)

  //   const channel = pusher.subscribe('presence-channel')

  //   channel.bind('reorder-col', arg => {
  //     console.log(`🟢  pusher:reorder-col succeeded `, arg)
  //   })

  //   // Make sure to unsubscribe once component unmounts
  //   return () => {
  //     pusher.unsubscribe('presence-channel')
  //   }
  // }, [])

  return (
    <div className="pt-[180px]">
      <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mb-8">
        My Project
      </h1>
      <ProjectBoard />
      <div id="modal"></div>
    </div>
  )
}

export default Project
