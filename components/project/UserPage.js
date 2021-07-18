import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../store/userSlice'
import { fetchEditUser } from '../../store/userSlice'
import Navbar from '../nav/Navbar'

const UserPage = () => {
  const dispatch = useDispatch()
  //toggling true-false states
  const [isShowing, setIsShowing] = useState(false)

  //grabbing user from the state
  const user = useSelector(state => state.user)
  //getting user from the DB/componentDidMount
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  function toggleUserUpdate(event) {
    setIsShowing(!isShowing)
  }

  //Set State
  const [firstName, setFirstName] = useState('')
  const [emailState, setEmailState] = useState('')

  // this is used for re-rendering so input fields will get prepopulated with text
  useEffect(() => {
    setFirstName(user.name)
    setEmailState(user.email)
  }, [user])

  //submit to change name and email
  const handleSubmit = event => {
    event.preventDefault()
    const userToUpdate = { id: user.id, name: firstName, email: emailState }
    dispatch(fetchEditUser(userToUpdate))
    toggleUserUpdate()
  }

  return (
    <React.Fragment>
      <div className="flex bg-gray-100">
        <Navbar />
        <main className="flex-grow flex flex-col min-h-screen">
          <div className="m-10">
            <h2 className=" flex flex-column text-5xl">User information</h2>
            <h2 className="mt-5 flex flex-column text-3xl">
              Hello {user.name || 'friend'}
            </h2>
            <button
              className="mt-5 border px-2  rounded text-black-800 hover:text-green-400 border-black hover:border-green-400 focus:outline-none"
              onClick={toggleUserUpdate}
            >
              Update Profile
            </button>
          </div>
          {/* form to edit user info */}
          {isShowing ? (
            <div className="mt-5 flex justify-center items-center">
              <form
                onSubmit={handleSubmit}
                className="bg-gray-200 w-110 rounded-lg m-4 p-4 flex"
              >
                <div className="flex flex-col space-y-4 space-x-3">
                  <h1 className="text-center">My Profile</h1>
                  <div className="flex flex-col space-y-5 justify-center">
                    <div className="flex flex-row space-x-1">
                      <label className="mt-2">First Name</label>
                      <input
                        value={firstName || ''}
                        className="rounded-lg"
                        type="text"
                        name="firstName"
                        onChange={e => setFirstName(e.target.value)}
                        placeholder="Type Your Name"
                      />
                    </div>
                    <div className="flex flex-row space-x-11">
                      <label className="text-center mt-2">Email</label>
                      <input
                        name="emailState"
                        value={emailState || ''}
                        className="rounded-lg"
                        type="text"
                        onChange={e => setEmailState(e.target.value)}
                        placeholder="Type Your Email"
                      />
                    </div>
                    <button
                      type="submit"
                      className="mr-2 border px-2 m-3 rounded text-black-800 hover:text-green-400 border-black hover:border-green-400 focus:outline-none"
                    >
                      Update My Info
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </main>
      </div>
    </React.Fragment>
  )
}

export default UserPage
