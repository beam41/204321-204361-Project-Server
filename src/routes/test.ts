import { Router } from "express"
import { testInsert } from "../databases/insert"
import { db } from "../databases"

const router: Router = Router()

router.post("/testStu", (req, res) => {
  testInsert()
  res.send("Hi")
})

router.post("/addReaded", (req, res) => {
  db.exec("ALTER TABLE CHAT ADD Readed INTEGER DEFAULT 0;", err => {
    if (err) console.error(err)
  })
  res.send("Sure")
})

export default router
