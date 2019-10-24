import sqlite3 from "sqlite3"
import colors from "colors/safe"

const sql = sqlite3.verbose()

export const db = new sql.Database(process.env.DB, err => {
  if (err) console.error(err.message)
  else console.log(colors.green("Connected to the database :)"))
})

export default {}
