import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchInvitations } from '../../store/invitationsSlice'
import { fetchUpdateInvite } from '../../store/invitationSlice'
import Logo from '../../components/Logo'
import Image from 'next/image'
import alert from '../../public/assets/alertIcon.svg'
import pending from '../../public/assets/pendingIcon.svg'
import check from '../../public/assets/checkIcon.svg'

export default function MyInvites() {
  const invitations = useSelector(state => state.invitations)
  const invitation = useSelector(state => state.invitation)
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [isInviteResponded, setInviteResponded] = useState(false)
  const sentInvites = invitations.sentInvites || []
  const receivedInvites = invitations.receivedInvites || []
  //received invites
  const pendingReceivedInvites = receivedInvites.filter(
    invite => invite.status === 'PENDING'
  )
  const historyReceivedInvites = receivedInvites.filter(
    invite => invite.status !== 'PENDING'
  )

  //sent invites
  const pendingSentInvites = sentInvites.filter(
    invite => invite.status === 'PENDING'
  )
  const historySentInvites = sentInvites.filter(
    invite => invite.status !== 'PENDING'
  )

  useEffect(() => {
    dispatch(fetchInvitations())
    setLoading(false)
  }, [dispatch, invitation])

  const handleResponse = (invite, value) => {
    const thunkArg = { invite, value }
    // console.log('invite', invite)
    dispatch(fetchUpdateInvite(thunkArg))
    setInviteResponded(true)
  }

  console.log('invitations', invitations)

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  console.log('invitations', invitations)

  return (
    <React.Fragment>
      <Logo />
      <h2 id="tenor" className="leading-loose">
        Invitations
      </h2>
      <hr className="border-1 border-skyblue dark:border-gray-500 pb-2"></hr>
      <h4 className="mt-4 text-base">
        Any invitations that you receive will show up here.
      </h4>
      <br />

      <div className="flex flex-col">
        <section className="my-4 border border-navyblue dark:border-gray-400 rounded-lg p-6 pb-8">
          <h3 id="tenor" className="mb-2">
            Pending Invites
          </h3>
          <hr className="border-1 border-skyblue dark:border-gray-500 pb-4"></hr>
          {pendingReceivedInvites.length === 0 &&
            pendingSentInvites.length === 0 &&
            'You currently do not have any pending invitations.'}

          {pendingReceivedInvites.map(invite => (
            <div className="flex items-center mt-4 mb-2" key={invite.id}>
              {invite.project ? (
                <>
                  <Image src={alert} alt="alertIcon" width={24} height={24} />
                  <span className="pl-2">
                    {invite.sentFrom.name} invited you to join project{' '}
                    {invite.project.name}
                  </span>
                </>
              ) : (
                <>
                  <Image src={alert} alt="alertIcon" width={24} height={24} />
                  <span className="pl-2">
                    {invite.sentFrom.name} invited you to join organization{' '}
                    {invite.org.name}
                  </span>
                </>
              )}

              {/* <p>{invite.status}</p> */}

              <div>
                <button
                  type="submit"
                  className="bg-transparent dark:bg-gray-600 text-navyblue hover:text-white  hover:bg-green-500 dark:text-gray-300 border border-navyblue dark:border-gray-600 hover:border-green-500 rounded-lg dark:hover:bg-green-500 p-2 py-1 ml-2 text-xs"
                  value="ACCEPTED"
                  onClick={e => handleResponse(invite, e.target.value)}
                >
                  Accept
                </button>
                <button
                  type="submit"
                  className="bg-transparent dark:bg-gray-600 text-navyblue hover:text-white hover:bg-red-500 dark:text-gray-300 border border-navyblue dark:border-gray-600 rounded-lg hover:border-red-500  dark:hover:bg-red-500 p-2 py-1 ml-2 text-xs"
                  value="DECLINED"
                  onClick={e => handleResponse(invite, e.target.value)}
                >
                  Deny
                </button>
              </div>
            </div>
          ))}

          {pendingSentInvites.map(invite => (
            <div className="flex items-center mt-4 mb-2" key={invite.id}>
              {invite.project ? (
                <>
                  <Image
                    src={pending}
                    alt="pendingIcon"
                    width={24}
                    height={24}
                  />
                  <span className="pl-2">
                    You invited {invite.receivedBy.name} to join project{' '}
                    {invite.project.name}
                  </span>
                </>
              ) : (
                <>
                  <Image
                    src={pending}
                    alt="pendingIcon"
                    width={24}
                    height={24}
                  />
                  <span className="pl-2">
                    You invited {invite.receivedBy.name} to join organization{' '}
                    {invite.org.name}
                  </span>
                </>
              )}
            </div>
          ))}
        </section>

        <section className="my-4 border border-navyblue dark:border-gray-400 rounded-lg p-6 pb-8 overflow-y-scroll">
          <h3 id="tenor" className="mb-2">
            History
          </h3>
          <hr className="border-1 border-skyblue dark:border-gray-500 pb-4"></hr>
          {historyReceivedInvites.map(invite => (
            <div
              className="flex items-center mt-4 mb-2 overflow-y-auto"
              key={invite.id}
            >
              {invite.project ? (
                <span className="pl-2">
                  You were invited by {invite.sentFrom.name} to join project{' '}
                  {invite.project.name}
                </span>
              ) : (
                <span className="pl-2">
                  You were invited by {invite.sentFrom.name} to join
                  organization{` ${invite.org.name}`}
                </span>
              )}
              <span className="text-xs lowercase pl-2 tracking-wider">
                ({invite.status})
              </span>
            </div>
          ))}

          {historySentInvites.map(invite => (
            <div className="flex items-center mt-4 mb-2" key={invite.id}>
              {invite.project ? (
                <span className="pl-2">
                  {invite.receivedBy.name} received your invitation to join
                  project{` ${invite.project.name}`}
                </span>
              ) : (
                <span className="pl-2">
                  {invite.receivedBy.name} received your invitation to join
                  organization{` ${invite.org.name}`}
                </span>
              )}
              <span className="text-xs lowercase pl-2 tracking-wider">
                ({invite.status})
              </span>
            </div>
          ))}
        </section>
      </div>
    </React.Fragment>
  )
}
