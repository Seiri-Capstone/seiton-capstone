import React from 'react'

export default function MemberRoleMenu({ show }) {
  if (!show) return null
  return (
    <div>
      <select>
        <option value="admin">Admin</option>
        <option value="collab">Collaborater</option>
      </select>
    </div>
  )
}
