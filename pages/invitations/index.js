import React from 'react'
import MyInvites from '../../components/invitation/MyInvites'
import Navbar from '../../components/nav/Navbar'

export default function Invitation() {
  return (
    <div>
      <div className="flex">
        <Navbar />
        <div className="flex-col">
          <h1 className="font-ibm text-6xl font-bold text-red-800 dark:text-red-200 text-center mt-8">
            Invitations
          </h1>
          <MyInvites />
        </div>
      </div>
      <div id="inviteModal"></div>
    </div>
  )
}
