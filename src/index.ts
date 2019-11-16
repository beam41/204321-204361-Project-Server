import "dotenv/config"
import colors from "colors/safe"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import routes from "./routes"
import { runDB } from "./databases"
import { runDB as runJwtDB } from "./databases/used-jwt"
import { compareUP } from "./databases/select"

console.log(
  colors.yellow(
    "[" +
      new Date().toUTCString() +
      "] " +
      `This server is running in ${process.env.NODE_ENV} mode!`,
  ),
)

runDB()
runJwtDB()

const app: express.Application = express()

//important middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use("/auth", routes.auth)
app.use("/test", routes.test)
app.use("/request", routes.request)
app.use("/plan", routes.plan)

app.get("/", (req, res) => res.send("Hi"))

app.get("/test", async (req, res) =>
  res.send(await compareUP(req.body.username, req.body.password)),
)

//listen
let port = process.env.PORT || 3000
app.listen(port, () =>
  console.log(
    colors.green(
      "[" +
        new Date().toUTCString() +
        "] " +
        "[Express] Server listening on port " +
        colors.bold(`${port}`),
    ),
  ),
)
