import { Router } from "express"
import { requireJWTAuth, extractIdJwt } from "./auth"
import { newChat } from "../databases/insert"
import { getChat, getAdv } from "../databases/select"

/**
 * the reason I sent / received message here
 *
 * is because it's can easily does the authorization
 *
 * while SocketIO (I) can't
 *
 * so it's can prevent spoofing
 *
 * (I don't know why I think about security in small semester project)
 *
 */

const router: Router = Router()

router.post("/", requireJWTAuth, extractIdJwt, (req, res) => {
  // @ts-ignore
  if (req.userType === "student") {
    const bd = {
      // @ts-ignore
      StudentID: req.user,
      AdvisorID: req.body.to,
      Time: req.body.Time,
      Message: req.body.Message,
      SentBy: "student",
    }
    // @ts-ignore
    newChat(bd)
    res.send([bd])
  } else {
    const bd = {
      StudentID: req.body.to,
      // @ts-ignore
      AdvisorID: req.user,
      Time: req.body.Time,
      Message: req.body.Message,
      SentBy: "advisor",
    }
    // @ts-ignore
    newChat(bd)
    res.send([bd])
  }
})

router.get("/", requireJWTAuth, extractIdJwt, async (req, res) => {
  // @ts-ignore
  if (req.userType === "student")
    // @ts-ignore
    res.send(await getChat(req.user, await getAdv(req.user), req.query.latest))
  else res.status(403).send()
})

router.get("/:id", requireJWTAuth, extractIdJwt, async (req, res) => {
  // @ts-ignore
  if (req.userType === "advisor")
    // @ts-ignore
    res.send(await getChat(req.params.id, req.user, req.query.latest))
  else res.status(403).send()
})

export default router
