const app = require("express")()
const cors = require("cors")
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")

const users = require("./user")
const plans = require("./plans")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/courses", (req, res) => {
  const str = fs.readFileSync(path.join(__dirname, "course.json"), {
    encoding: "utf8",
  })
  const courses = JSON.parse(str)
  res.send(courses)
})

app.get("/users", (req, res) => {
  res.send(users)
})

app.get("/plans", (req, res) => {
  res.send(plans)
})

app.get("/plans/:id", (req, res) => {
  res.send(plans.filter(val => val.ID === req.params.id))
})

const port = 9999
app.listen(port, () => console.log("Server listening on port " + port))
