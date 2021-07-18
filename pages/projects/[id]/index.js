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
      {/* This is to make sure the colors are built so we can use in different components */}
      <div className="text-gray-500"></div>
      <div className="text-warmGray-500"></div>
      <div className="text-red-500"></div>
      <div className="text-orange-500"></div>
      <div className="text-amber-500"></div>
      <div className="text-yellow-500"></div>
      <div className="text-lime-500"></div>
      <div className="text-green-500"></div>
      <div className="text-emerald-500"></div>
      <div className="text-teal-500"></div>
      <div className="text-cyan-500"></div>
      <div className="text-sky-500"></div>
      <div className="text-blue-500"></div>
      <div className="text-indigo-500"></div>
      <div className="text-violet-500"></div>
      <div className="text-purple-500"></div>
      <div className="text-fuschia-500"></div>
      <div className="text-pink-500"></div>
      <div className="text-rose-500"></div>
      <div className="border-gray-500"></div>
      <div className="border-warmGray-500"></div>
      <div className="border-red-500"></div>
      <div className="border-orange-500"></div>
      <div className="border-amber-500"></div>
      <div className="border-yellow-500"></div>
      <div className="border-lime-500"></div>
      <div className="border-green-500"></div>
      <div className="border-emerald-500"></div>
      <div className="border-teal-500"></div>
      <div className="border-cyan-500"></div>
      <div className="border-sky-500"></div>
      <div className="border-blue-500"></div>
      <div className="border-indigo-500"></div>
      <div className="border-violet-500"></div>
      <div className="border-purple-500"></div>
      <div className="border-fuschia-500"></div>
      <div className="border-pink-500"></div>
      <div className="border-rose-500"></div>
      <div className="flex">
        <div className="flex-col">
          <ProjectBoard pusher={pusher} />
        </div>
      </div>
      <div id="modal"></div>
    </div>
  )
}

export default Project
