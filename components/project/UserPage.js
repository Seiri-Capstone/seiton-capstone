/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../store/userSlice'
import { fetchEditUser } from '../../store/userSlice'
import Logo from '../../components/Logo'

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

  //Set State
  const [firstName, setFirstName] = useState('')
  const [emailState, setEmailState] = useState('')
  const [image, setImage] = useState('')

  // this is used for re-rendering so input fields will get prepopulated with text
  useEffect(() => {
    setFirstName(user.name)
    setEmailState(user.email)
    setImage(user.image)
  }, [user])

  //submit to change name and email
  const handleSubmit = event => {
    event.preventDefault()
    const userToUpdate = {
      id: user.id,
      name: firstName,
      email: emailState,
      image: image
    }
    dispatch(fetchEditUser(userToUpdate))
  }
  console.log('user', user)
  const joinedDate = String(new Date(user.createdAt)).substring(3, 15)

  return (
    <React.Fragment>
      <Logo />
      <h2 id="tenor">User Profile</h2>
      <h4 className="my-4 mt-12">
        Hi {user.name || 'friend'}! <br />
      </h4>
      <span className="my-8 dark:text-gray-400">Joined on {joinedDate}</span>

      <div className="my-2 border rounded-lg border-navyblue p-12 flex justify-evenly w-full">
        <div className="mr-2 w-1/4">
          <img src={`${user.image}`} alt="profileImg" className="roundImg" />
        </div>
        <form onSubmit={handleSubmit} className="w-3/4 px-4 flex flex-col">
          <div className="flex flex-row w-full items-center my-2">
            <label id="tenor" className="w-20">
              Name:
            </label>
            <input
              value={firstName || ''}
              className="rounded-lg border-none w-full"
              type="text"
              name="firstName"
              onChange={e => setFirstName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="flex flex-row w-full items-center my-2">
            <label id="tenor" className="w-20">
              Email:{' '}
            </label>
            <input
              name="emailState"
              value={emailState || ''}
              className="rounded-lg border-none w-full"
              type="text"
              onChange={e => setEmailState(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="flex flex-row w-full items-center my-2">
            <label id="tenor" className="w-20">
              Image:
            </label>
            <input
              name="image"
              value={image || ''}
              className="rounded-lg border-none w-full"
              type="text"
              onChange={e => setImage(e.target.value)}
              placeholder="Image URL"
            />
          </div>
          <button
            type="submit"
            className="bg-skyblue dark:bg-gray-600 text-white hover:bg-navyblue dark:text-gray-300 rounded-lg dark:hover:bg-skyblue p-4 py-1 mt-4 text-base shadow-sm self-end"
          >
            Update My Info
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default UserPage
