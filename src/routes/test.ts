import { Router } from "express"
import { testInsert } from "../databases/insert"

const router: Router = Router()

router.post("/testStu", (req, res) => {
  testInsert()
  res.send("Hi")
})

export default router
