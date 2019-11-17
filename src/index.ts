import "dotenv/config"
import colors from "colors/safe"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import routes from "./routes"
import { runDB } from "./databases"
import { runDB as runJwtDB } from "./databases/used-jwt"
import { runDB as runMapDB } from "./databases/usn-map"
import http from "http"
import socketio from "socket.io"
import chat from "./socket/chat"

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
runMapDB()

const app: express.Application = express()
const server = http.createServer(app)
const io = socketio(server)

//important middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use("/api/auth", routes.auth)
app.use("/api/test", routes.test)
app.use("/api/request", routes.request)
app.use("/api/plan", routes.plan)
app.use("/api/chat", routes.chat)

// passing io
chat(io)

app.get("/api", (req, res) => res.send("Hi"))

//listen
let port = process.env.PORT || 3000
server.listen(port, () =>
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
