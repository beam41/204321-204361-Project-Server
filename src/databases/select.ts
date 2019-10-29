import { db } from "./index"
import { Student, Advisor } from "../models"

/**
 * compare Username and Password
 *
 * promise value will be true if match
 */
export async function compareUP(username: string, password: string): Promise<boolean> {
  let found: boolean = false
  await new Promise((resolve, reject) =>
    db.get(
      `
    SELECT  StudentID
    FROM    STUDENT
    WHERE   StudentID = '${username}'
    AND     Password = '${password}'
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then((value: Student) => {
    if (value) found = value.StudentID === username
  })
  await new Promise((resolve, reject) =>
    db.get(
      `
    SELECT  AdvisorID
    FROM    ADVISOR
    WHERE   AdvisorID = '${username}'
    AND     Password = '${password}'
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then((value: Advisor) => {
    if (value) found = value.AdvisorID === username
  })
  return found
}

/**
 * find User by username
 *
 * promise value will be true if match
 *
 * It's compareUP w/o password
 */
export async function findUser(username: string): Promise<boolean> {
  let found: boolean = false
  await new Promise((resolve, reject) =>
    db.get(
      `
    SELECT  StudentID
    FROM    STUDENT
    WHERE   StudentID = '${username}'
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then((value: Student) => {
    if (value) found = value.StudentID === username
  })
  await new Promise((resolve, reject) =>
    db.get(
      `
    SELECT  AdvisorID
    FROM    ADVISOR
    WHERE   AdvisorID = '${username}'
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then((value: Advisor) => {
    if (value) found = value.AdvisorID === username
  })
  return found
}

/**
 * return user type from username
 *
 * username is always unique so don't worry
 */
export async function findUserType(username: string): Promise<string> {
  let found: string = null
  await new Promise((resolve, reject) =>
    db.get(
      `
    SELECT  StudentID
    FROM    STUDENT
    WHERE   StudentID = '${username}'
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then((value: Student) => {
    if (value) found = "student"
  })
  await new Promise((resolve, reject) =>
    db.get(
      `
    SELECT  AdvisorID
    FROM    ADVISOR
    WHERE   AdvisorID = '${username}'
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then((value: Advisor) => {
    if (value) found = "advisor"
  })
  return found
}
