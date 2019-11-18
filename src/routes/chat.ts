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
  if (req.userType === "student")
    newChat(
      req.body.chat.map(val => {
        return {
          StudentID: req.user,
          AdvisorID: val.to,
          Time: val.Time,
          Message: val.Message,
          SentBy: "student",
        }
      }),
    )
  else
    newChat(
      req.body.chat.map(val => {
        return {
          StudentID: val.to,
          AdvisorID: req.user,
          Time: val.Time,
          Message: val.Message,
          SentBy: "advisor",
        }
      }),
    )
  res.send("complete")
})

router.get("/", requireJWTAuth, extractIdJwt, async (req, res) => {
  // @ts-ignore
  if (req.userType === "student")
    // @ts-ignore
    res.send(await getChat(req.user, await getAdv(req.user), req.body.latest))
  else res.status(403).send()
})

router.get("/:id", requireJWTAuth, extractIdJwt, async (req, res) => {
  // @ts-ignore
  if (req.userType === "advisor")
    // @ts-ignore
    res.send(await getChat(req.params.id, req.user, req.body.latest))
  else res.status(403).send()
})

export default router
