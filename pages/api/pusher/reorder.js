import { pusher } from '../../../lib/pusher'

export default async function handler(req, res) {
  try {
    const { project } = req.body
    console.log('in the reorder pusher api call')

    const response = await pusher.trigger('presence-channel', 'reorder', {
      project
    })

    // if (req.body.isTaskReordered) {
    //   const response = await pusher.trigger(
    //     'presence-channel',
    //     'reorder-task',
    //     {
    //       project
    //     }
    //   )
    // }

    // const response = await pusher.trigger('presence-channel', 'reorder-tasks', {
    //   project
    // })
    // console.log(`🟢  The reponse AFTER pusher.trigger: `, response.status)
    res.json({ status: 200 })
  } catch (error) {
    console.log('error in reorder col pusher api call')
  }
}
