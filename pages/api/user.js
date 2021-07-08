export default async function handler(req, res) {
  setTimeout(() => {
    res.status(200).json({ name: 'Sey Kim!' })
  }, 2000)
}
