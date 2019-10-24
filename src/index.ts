import "babel-polyfill"
import "dotenv"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

console.log(`This is running in ${process.env.NODE_ENV} mode!`)

const app: express.Application = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let port = process.env.PORT || 3000

app.get("/", (req, res) => res.send("Hi"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
