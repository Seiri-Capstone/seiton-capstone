const Comments = ({ comments }) => {
  return (
    <ul>
      {comments.map(c => (
        <li className="ml-2 text-sm text-gray-400" key={c.id}>
          {c.body}, by {c.user.name}
        </li>
      ))}
    </ul>
  )
}

export default Comments
