import _axios from "axios"

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
  axios.get("/users")
}

/**
 * fetch student plan
 *
 * this method is run if user plan is not cached (with id)
 *
 * it's can be manually run by remote regserver
 *
 */
export function fetchPlan(id?: number) {
  if (id) axios.get(`/plans/{id}`)
}

/**
 * fetch course and cache on server
 *
 * it's can be manually run by remote regserver
 *
 */
export function fetchCourse() {
  axios.get("/course")
}
