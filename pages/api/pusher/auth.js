//not sure how to use this pusher authentication

import pusher from '../../../lib/pusher'

export default async function handler(req, res) {
  // see https://pusher.com/docs/channels/server_api/authenticating-users
  const { socket_id, channel_name, username } = req.body

  // Hit this route when I go to Socket.js Pages
  console.log(
    `🟠🟠🟠 socket_id: ${socket_id}, channel_name: ${channel_name}, username: ${username}`
  )

  /**
   * https://gist.github.com/alex-cory/84451eba3257953ca5ccd979c00f9962
   */

  const randomString = Math.random().toString(36).slice(2)

  const presenceData = {
    user_id: randomString,
    user_info: {
      username
    }
  }

  try {
    const auth = pusher.authenticate(socket_id, channel_name, presenceData)
    res.send(auth)
  } catch (error) {
    console.error(error)
  }
}
