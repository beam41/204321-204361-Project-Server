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

export default router
