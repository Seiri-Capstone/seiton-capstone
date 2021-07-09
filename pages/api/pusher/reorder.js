import { pusher } from '../../../lib/pusher'

export default async function handler(req, res) {
  const { project } = req.body
  // trigger a new post event via pusher
  console.log(`🟢  PROJECT: ${project}`)

  const response = await pusher.trigger('presence-channel', 'reorder-col', {
    project
  })

  console.log(`🟢  The reponse AFTER pusher.trigger: `, response)

  res.json({ status: 200 })
}
