import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchInvitations } from '../../store/invitationsSlice'
import SendInviteModal from './SendInviteModal'

export default function MyInvites() {
  const invitations = useSelector(state => state.invitations)
  const sentInvites = invitations.sentInvites || []
  const receivedInvites = invitations.receivedInvites || []
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)
  const [show, setShow] = useState(false)

  useEffect(() => {
    dispatch(fetchInvitations())
    setLoading(false)
  }, [dispatch])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <React.Fragment>
      <button
        type="submit"
        className="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 p-4 py-2 focus:outline-none"
        onClick={() => setShow(true)}
      >
        Send Invite!
      </button>
      <div>
        <div className="ml-4">
          <h1 className="text-xl">Sent Invites</h1>

          {sentInvites.map(invite => (
            <div className="my-3" key={invite.id}>
              <p>
                You invited {invite.receivedBy.name} to join project
                {invite.project.name}
              </p>
              <p>{invite.status}</p>
            </div>
          ))}
        </div>

        <div className="ml-4">
          <h1 className="text-xl">Received Invites</h1>
          {receivedInvites.map(invite => (
            <div className="my-3" key={invite.id}>
              <p>
                You received an invitation from {invite.sentFrom.name} to join
                project
                {invite.project.name}
              </p>
              <p>{invite.status}</p>
              <button
                type="submit"
                className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              >
                Accept
              </button>
              <button
                type="submit"
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                Deny
              </button>
            </div>
          ))}
        </div>
      </div>
      <SendInviteModal show={show} onClose={() => setShow(false)} />
    </React.Fragment>
  )
}
