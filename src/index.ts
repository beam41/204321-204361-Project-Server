import "babel-polyfill"
import "dotenv/config"
import colors from "colors/safe"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import routes from "./routes"

console.log(colors.yellow(`This server is running in ${process.env.NODE_ENV} mode!`))

const app: express.Application = express()

//important middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use("/auth", routes.auth)

app.get("/", (req, res) => res.send("Hi"))

//listen
let port = process.env.PORT || 3000
app.listen(port, () => console.log(colors.green(`Server listening on port ${port}!`)))
