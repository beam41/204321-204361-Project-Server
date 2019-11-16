import { Router } from "express"
import jwt from "jwt-simple"
import passport from "passport"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import colors from "colors/safe"
import { Payload } from "../models"
import { compareUP, findUser, findUserType } from "../databases/select"
import { insertNew, findExpJwt } from "../databases/used-jwt"

const router: Router = Router()

//JWT and Passport
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRET,
}
const jwtAuth: JwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload: Payload, done) => {
    const reJwt = jwt.encode(payload, process.env.SECRET)
    if ((await findUser(payload.sub)) && !(await findExpJwt(reJwt)))
      done(null, true)
    else done(null, false)
  },
)
passport.use(jwtAuth)

//login middleware
export const requireJWTAuth = passport.authenticate("jwt", { session: false })

//login check
router.get("/test", requireJWTAuth, extractIdJwt, (req, res) => {
  res.send(`${req.user} is here!`)
})

router.post(
  "/login",
  // login check handler
  async (req, res, next) => {
    if (await compareUP(req.body.username, req.body.password)) next()
    else res.status(400).send("UsnPwd")
  },
  // return payload
  async (req, res) => {
    const time = Math.trunc(Date.now() / 1000)
    const payload: Payload = {
      sub: req.body.username,
      iat: time,
      exp: time + +process.env.TIMEOUT,
    }
    res.send({
      jwt: jwt.encode(payload, process.env.SECRET),
      username: req.body.username,
      userType: await findUserType(req.body.username),
      expireOn: time + +process.env.TIMEOUT,
    })
    console.log(
      "[" +
        new Date().toUTCString() +
        "] " +
        "[Express] User " +
        colors.bold(req.body.username) +
        " is logging in.",
    )
  },
)

router.post(
  "/logout",
  requireJWTAuth,
  extractIdJwt,
  // return payload
  async (req, res) => {
    insertNew(
      req.header("Authorization"),
      jwt.decode(req.header("Authorization"), process.env.SECRET).exp * 1000,
    )
    res.send("done")
    console.log(
      "[" +
        new Date().toUTCString() +
        "] " +
        "[Express] User " +
        // @ts-ignore
        colors.bold(req.user) +
        " is logged out.",
    )
  },
)

export async function extractIdJwt(req, res, next) {
  req.user = jwt.decode(req.header("Authorization"), process.env.SECRET).sub
  req.userType = await findUserType(req.user)
  next()
}

export default router
