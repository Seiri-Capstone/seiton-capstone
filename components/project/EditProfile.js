import React from 'react'

const Profile = () => {
  return (
    <div className="mt-20 flex justify-center items-center">
      <section className="bg-gray-200 w-80 rounded-lg m-4 p-4 flex">
        <div className="flex flex-col space-y-4 space-x-3">
          <h1 className="text-center">My Profile</h1>
          <form
            className="flex flex-col space-y-5 justify-center"
            onSubmit={console.log('hi')}
          >
            <div className="flex flex-row space-x-1">
              <label className="">First Name</label>
              <input
                className=""
                type="text"
                name="firstName"
                onChange={console.log('input')}
              />
            </div>

            <div className="">
              <label>Last Name </label>
              <input
                className=""
                type="text"
                name="lastName"
                onChange={console.log()}
              />
            </div>

            <div className="flex flex-row space-x-11">
              <label className="">Email </label>
              <input
                className=""
                type="text"
                name="email"
                onChange={console.log('email')}
              />
            </div>

            {/* <div className="flex flex-row space-x-7">
            <pre></pre>
            <label>Photo </label>
            <input
              className=""
              name="photo"
              type="text"
              onChange={console.log('image')}
            />
          </div> */}

            <button
              className="mr-2 border px-2 m-3 rounded text-black-800 hover:text-green-400 border-black hover:border-green-400 focus:outline-none"
              type="submit"
            >
              Update My Info
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Profile
