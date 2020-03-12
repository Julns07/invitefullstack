import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import User from "./User"
import Going from "./Going"
import NotGoing from "./NotGoing"

export default props => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={User} />
        <Route path="/going" component={Going} />
        <Route path="/notgoing" component={NotGoing} />
      </div>
    </Router>
  )
}
