import { Router } from "express"
import { getPlans } from "../databases/select"
import colors from "colors/safe"
import { requireJWTAuth, extractIdJwt } from "./auth"
import { updateEditedGrade } from "../databases/update"

const router: Router = Router()

router.get("/:id", requireJWTAuth, extractIdJwt, (req, res) => {
  // @ts-ignore
  if (req.user === req.params.id || req.userType === "advisor")
    getPlans(req.params.id)
      .then(val => {
        console.log(
          "[" +
            new Date().toUTCString() +
            "] " +
            "[Express] " +
            "User " +
            // @ts-ignore
            colors.bold(req.user) +
            " gets " +
            (req.user === req.params.id ? "their" : req.params.id) +
            " plan",
        )
        res.send(val)
      })
      .catch(err => console.error(colors.red(err)))
  else res.status(403).send()
})

router.put("/:id", requireJWTAuth, extractIdJwt, (req, res) => {
  // @ts-ignore
  if (req.user === req.params.id) {
    // @ts-ignore
    updateEditedGrade(
      req.params.id,
      req.body.CourseID,
      req.body.Year,
      req.body.Term,
      req.body.EditedGrade,
    ).then(val => {
      console.log(
        "[" +
          new Date().toUTCString() +
          "] " +
          "[Express] " +
          "User " +
          // @ts-ignore
          colors.bold(req.user) +
          " edited grade to " +
          colors.bold(val.EditedGrade) +
          " in plan",
      )
      res.send(val)
    })
  } else res.status(403).send()
})

export default router
