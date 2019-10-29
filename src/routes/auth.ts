import { Router } from "express"
import jwt from "jwt-simple"
import passport from "passport"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import colors from "colors/safe"
import { Payload } from "../models"
import { compareUP, findUser, findUserType } from "../databases/select"

const router: Router = Router()

//JWT and Passport
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRET,
}
const jwtAuth: JwtStrategy = new JwtStrategy(
  jwtOptions,
  (payload: Payload, done) => {
    // TODO: check sub in database
    if (findUser(payload.sub)) done(null, true)
    else done(null, false)
  },
)
passport.use(jwtAuth)

//login middleware
export const requireJWTAuth = passport.authenticate("jwt", { session: false })

//login check
router.get("/test", requireJWTAuth, (req, res) => {
  res.send(
    `${
      jwt.decode(req.header("Authorization"), process.env.SECRET).sub
    } is here!`,
  )
})

router.post(
  "/login",
  // login check handler
  async (req, res, next) => {
    // TODO: check with database
    if (await compareUP(req.body.username, req.body.password)) next()
    else res.send("Wrong username and/or password")
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
      "[Express] user " + colors.bold(req.body.username) + " is logging in.",
    )
  },
)

export default router
