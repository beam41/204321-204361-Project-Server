import express, { Router } from "express"
import jwt from "jwt-simple"
import passport from "passport"
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt"
import colors from "colors/safe"
import { Payload } from "../models"

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
    if (payload.sub === "meehoi") done(null, true)
    else done(null, false)
  },
)
passport.use(jwtAuth)

//login middleware
export const requireJWTAuth = passport.authenticate("jwt", { session: false })

//login check
router.get("/", requireJWTAuth, (req, res) => {
  res.send(
    `${
      jwt.decode(req.header("Authorization"), process.env.SECRET).sub
    } is here!`,
  )
})

router.post(
  "/login",
  // login check handler
  (req, res, next) => {
    // TODO: check with database
    if (req.body.username === "meehoi" && req.body.password === "mee") next()
    else res.send("Wrong username and/or password")
  },
  // return payload
  (req, res) => {
    const time = Math.trunc(Date.now() / 1000)
    const payload: Payload = {
      sub: req.body.username,
      iat: time,
      exp: time + +process.env.TIMEOUT,
    }
    res.send(jwt.encode(payload, process.env.SECRET))
    console.log("user " + colors.bold(req.body.username) + " is logging in.")
  },
)

export default router
