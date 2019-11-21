import { Router } from "express"
import { requireJWTAuth, extractIdJwt } from "./auth"
import { getStuList, getChat } from "../databases/select"

const router: Router = Router()

router.get("/stuli", requireJWTAuth, extractIdJwt, async (req, res) => {
  // @ts-ignore
  if (req.userType === "advisor") {
    // @ts-ignore
    const stdlist = await getStuList(req.user)
    let list = stdlist.map(async val => {
      // @ts-ignore
      const chat = await getChat(val.StudentID, req.user, 0)
      return { ...val, latestChat: chat[chat.length - 1] }
    })
    Promise.all(list).then(val => res.send(val))
  } else res.status(403).send()
})

export default router
