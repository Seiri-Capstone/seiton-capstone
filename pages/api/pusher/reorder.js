import { pusher } from '../../../lib/pusher'

export default async function handler(req, res) {
  const { thunkArg } = req.body
  // trigger a new post event via pusher
  console.log(`🟢  RESULT: ${thunkArg.result}, PROJECT: ${thunkArg.project}`)

  const response = await pusher.trigger('presence-channel', 'reorder-col', {
    thunkArg
  })

  console.log(`🟢  The reponse AFTER pusher.trigger: `, response)

  res.json({ status: 200 })
}
