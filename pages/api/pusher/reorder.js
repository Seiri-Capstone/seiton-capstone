import { pusher } from '../../../lib/pusher'

export default async function handler(req, res) {
  try {
    const { id, project } = req.body
    console.log('in the reorder pusher api call')

    const response = await pusher.trigger(`presence-channel-${id}`, 'reorder', {
      project
    })

    res.json({ status: 200 })
  } catch (error) {
    console.log('error in reorder col pusher api call')
  }
}
