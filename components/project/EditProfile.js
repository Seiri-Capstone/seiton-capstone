import React from 'react'

const Profile = () => {
  return (
    <section className="">
      <h1 className="">My Profile</h1>
      <form className="" onSubmit={console.log('hi')}>
        <div className="">
          <label>First Name</label>
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

        <div className="">
          <label>Email </label>
          <input
            className=""
            type="text"
            name="email"
            onChange={console.log('email')}
          />
        </div>

        <div className="">
          <pre></pre>
          <label>Photo </label>
          <input
            className=""
            name="photo"
            type="text"
            onChange={console.log('image')}
          />
        </div>

        <button className="" type="submit">
          Update My Info
        </button>
      </form>
    </section>
  )
}

export default Profile
