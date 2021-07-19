import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
const ProjectBoard = dynamic(import('../../../components/project/ProjectBoard'))
import Pusher from 'pusher-js'
import Navbar from '../../../components/nav/Navbar'

const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY, {
  cluster: 'us2', // based on my website
  authEndpoint: `/api/pusher/auth`, // make sure to change in production
  auth: { params: { username: 'sey' } } // not important rn? only to show user
})

{
  /* This is to make sure the colors are built so we can use in different components */
}
const Colors = () => {
  return (
    <>
      {' '}
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
      <div className="bg-gray-400"></div>
      <div className="bg-warmGray-400"></div>
      <div className="bg-red-400"></div>
      <div className="bg-orange-400"></div>
      <div className="bg-amber-400"></div>
      <div className="bg-yellow-400"></div>
      <div className="bg-lime-400"></div>
      <div className="bg-green-400"></div>
      <div className="bg-emerald-400"></div>
      <div className="bg-teal-400"></div>
      <div className="bg-cyan-400"></div>
      <div className="bg-sky-400"></div>
      <div className="bg-blue-400"></div>
      <div className="bg-indigo-400"></div>
      <div className="bg-violet-400"></div>
      <div className="bg-purple-400"></div>
      <div className="bg-fuschia-400"></div>
      <div className="bg-pink-400"></div>
      <div className="bg-rose-400"></div>
      <div className="bg-gray-300"></div>
      <div className="bg-warmGray-300"></div>
      <div className="bg-red-300"></div>
      <div className="bg-orange-300"></div>
      <div className="bg-amber-300"></div>
      <div className="bg-yellow-300"></div>
      <div className="bg-lime-300"></div>
      <div className="bg-green-300"></div>
      <div className="bg-emerald-300"></div>
      <div className="bg-teal-300"></div>
      <div className="bg-cyan-300"></div>
      <div className="bg-sky-300"></div>
      <div className="bg-blue-300"></div>
      <div className="bg-indigo-300"></div>
      <div className="bg-violet-300"></div>
      <div className="bg-purple-300"></div>
      <div className="bg-fuschia-300"></div>
      <div className="bg-pink-300"></div>
      <div className="bg-rose-300"></div>
      <div className="bg-warmGray-500"></div>
      <div className="bg-red-500"></div>
      <div className="bg-orange-500"></div>
      <div className="bg-amber-500"></div>
      <div className="bg-yellow-500"></div>
      <div className="bg-lime-500"></div>
      <div className="bg-green-500"></div>
      <div className="bg-emerald-500"></div>
      <div className="bg-teal-500"></div>
      <div className="bg-cyan-500"></div>
      <div className="bg-sky-500"></div>
      <div className="bg-blue-500"></div>
      <div className="bg-indigo-500"></div>
      <div className="bg-violet-500"></div>
      <div className="bg-purple-500"></div>
      <div className="bg-fuschia-500"></div>
      <div className="bg-pink-500"></div>
      <div className="bg-rose-500"></div>
    </>
  )
}

const Project = () => {
  return (
    <div className="flex h-screen bg-blue-100 dark:bg-gray-800">
      <Navbar />
      <Colors />
      <div className="flex-col ml-8 mt-4 w-5/6">
        <ProjectBoard pusher={pusher} />
      </div>
      <div id="modal"></div>
    </div>
  )
}

export default Project
