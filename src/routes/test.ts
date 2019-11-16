import { Router } from "express"
import { testInsert } from "../databases/insert"
import { getPlans } from "../databases/select"
import { db } from "../databases"
import colors from "colors/safe"

const router: Router = Router()

router.post("/testStu", (req, res) => {
  testInsert()
  res.send("Hi")
})

router.post("/addReaded", (req, res) => {
  db.exec("ALTER TABLE CHAT ADD Readed INTEGER DEFAULT 0;", err => {
    if (err) console.error(colors.red(err.message))
  })
  res.send("Sure")
})



export default router
