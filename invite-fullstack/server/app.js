const express = require("express")
const inviteRoutes = require("./routes/invite")

const app = express()
const port = 3001

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api", inviteRoutes)

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`)
})
