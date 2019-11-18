import { db } from "./index"
import { Student, Advisor, Course, Chat } from "../models"

/**
 * compare Username and Password
 *
 * promise value will be true if match
 */
export async function compareUP(
  username: string,
  password: string,
): Promise<string> {
  let found: string = null
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
    if (value) found = "student"
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
    if (value && !found) found = "advisor"
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
  let found: boolean = null
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
    if (value) found = true
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
    if (value && !found) found = true
  })
  return found
}

export async function getPlans(stuID: string): Promise<Course[]> {
  let found: Course[]
  await new Promise((resolve, reject) =>
    db.all(
      `
      SELECT P.CourseID, C.CourseName, P."Year", P.Term, P.Grade, P.EditedGrade, C.CourseCredit
      FROM STDPLAN P
      INNER JOIN COURSE C ON P.CourseID = C.CourseID
      WHERE P.StudentID = '${stuID}'
      ORDER BY P."Year", P.Term, P.CourseID
    `,
      (err, row) => {
        if (err) reject(err)
        else {
          let solve = []
          row.forEach((val: Course) => {
            if (val.Grade !== "P") {
              solve.push({
                CourseID: val.CourseID,
                CourseName: val.CourseName,
                CourseCredit: val.CourseCredit,
                Year: val.Year,
                Term: val.Term,
                Grade: val.Grade,
              })
            } else solve.push(val)
          })
          resolve(solve)
        }
      },
    ),
  ).then((value: Course[]) => {
    if (value) found = value
  })
  return found
}

export async function getChat(
  stuID: string,
  advID: string,
  time: number,
): Promise<Chat[]> {
  let found: Chat[]
  await new Promise((resolve, reject) =>
    db.all(
      `
      SELECT 	StudentID, AdvisorID, Time, Message, SentBy
      FROM 	CHAT
      WHERE 	StudentID = '${stuID}'
      AND		AdvisorID = '${advID}'
      AND		Time > ${time}
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then((value: Chat[]) => {
    if (value) found = value
  })
  return found
}

export async function getAdv(stuID: string): Promise<string> {
  let found: string
  await new Promise((resolve, reject) =>
    db.get(
      `
      SELECT 	AdvisorID
      FROM	STUDENT
      WHERE	StudentID = '${stuID}'
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then((value: any) => {
    if (value) found = value.AdvisorID
  })
  return found
}
