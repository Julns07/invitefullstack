import React, { useEffect } from "react"
import { useInvite } from "../hooks"
import User from "./User"

export default props => {
  const { going, fetchGoing } = useInvite()

  useEffect(() => fetchGoing(), [])

  return (
    <>
      {going.map(user => (
        <div className="user">
          <img src={user.img} />
          <p>{user.name}</p>
          <p>{user.phone}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </>
  )
}
