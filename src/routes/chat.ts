import { Router } from "express"
import colors from "colors/safe"
import { requireJWTAuth, extractIdJwt } from "./auth"

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

export default router
