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
      <div className="bg-gray-200"></div>
      <div className="bg-warmGray-200"></div>
      <div className="bg-red-200"></div>
      <div className="bg-orange-200"></div>
      <div className="bg-amber-200"></div>
      <div className="bg-yellow-200"></div>
      <div className="bg-lime-200"></div>
      <div className="bg-green-200"></div>
      <div className="bg-emerald-200"></div>
      <div className="bg-teal-200"></div>
      <div className="bg-cyan-200"></div>
      <div className="bg-sky-200"></div>
      <div className="bg-blue-200"></div>
      <div className="bg-indigo-200"></div>
      <div className="bg-violet-200"></div>
      <div className="bg-purple-200"></div>
      <div className="bg-fuschia-200"></div>
      <div className="bg-pink-200"></div>
      <div className="bg-rose-200"></div>{' '}
    </>
  )
}

const Project = () => {
  return (
    <div className="flex h-screen bg-blue-100 dark:bg-gray-800">
      <Navbar />
      <Colors />
      <div className="flex-col ml-24 mt-12 w-8/12">
        <ProjectBoard pusher={pusher} />
      </div>
      <div id="modal"></div>
    </div>
  )
}

export default Project
