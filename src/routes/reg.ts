import { Router } from "express"
import * as connect from "../util/connect"

const router: Router = Router()

router.post("/users", (req, res) => {
  console.log(
    "[" +
      new Date().toUTCString() +
      "] " +
      "[Express] reg requested to fetch users",
  )
  connect.fetchUser()
  res.send("try to fetch user now!")
})

router.post("/courses", (req, res) => {
  console.log(
    "[" +
      new Date().toUTCString() +
      "] " +
      "[Express] reg requested to fetch courses",
  )
  connect.fetchCourse()
  res.send("try to fetch course now!")
})

router.post("/courses", (req, res) => {
  console.log(
    "[" +
      new Date().toUTCString() +
      "] " +
      "[Express] reg requested to fetch student plan",
  )
  connect.fetchPlan()
  res.send("try to fetch plan now!")
})

export default router
