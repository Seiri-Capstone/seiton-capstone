import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchInvitations } from '../../store/invitationsSlice'

export default function MyInvites() {
  const invitations = useSelector(state => state.invitations)
  const sentInvites = invitations.sentInvites || []
  const receivedInvites = invitations.receivedInvites || []
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)

  console.log('sent', sentInvites)
  console.log('received', receivedInvites)

  useEffect(() => {
    dispatch(fetchInvitations())
    setLoading(false)
  }, [dispatch])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
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
          </div>
        ))}
      </div>
    </div>
  )
}
