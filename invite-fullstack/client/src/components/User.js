import React, { useEffect } from "react"
import { useInvite } from "../hooks"
import { Link } from "react-router-dom"
//import { useEffect } from "react"

export default props => {
  const { fetchUser, goingCount, notGoingCount, markUser, user } = useInvite()

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="user">
      <div>
        <Link to="/going">
          <p>Going: {goingCount}</p>
        </Link>
        <Link to="/notgoing">
          <p>Not Going: {notGoingCount}</p>
        </Link>
      </div>
      <img src={user.img} />
      <p>{user.name}</p>
      <p>{user.phone}</p>
      <p>{user.email}</p>
      <div>
        <button onClick={() => markUser(user, true)}>Going</button>
        <button onClick={() => markUser(user, false)}>Not Going</button>
      </div>
    </div>
  )
}
