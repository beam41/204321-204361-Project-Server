import _axios from "axios"
import colors from "colors/safe"
import { insertCourses, insertUsers, insertPlans } from "../databases/insert"

const axios = _axios.create({
  baseURL: process.env.REGURL,
})

/**
 * fetching new user
 *
 * this method need manually running by remote reg server
 *
 */
export function fetchUser() {
  axios.get("/users").then(
    value => {
      insertUsers(value.data)
    },
    err => console.error(colors.red(err)),
  )
}

/**
 * fetch student plan
 *
 * this method is run if user plan is not cached (with id) <-- maybe, not implement yet
 *
 * it's can be manually run by remote regserver
 *
 */
export function fetchPlan(id?: number) {
  axios.get(`/plans/${id ? id : ""}`).then(
    value => {
      insertPlans(value.data)
    },
    err => console.error(colors.red(err)),
  )
}

/**
 * fetch course and cache on server
 *
 * it's can be manually run by remote regserver
 *
 */
export function fetchCourse() {
  axios.get("/courses").then(
    value => {
      insertCourses(value.data)
    },
    err => console.error(colors.red(err)),
  )
}
