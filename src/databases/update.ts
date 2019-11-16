import { db } from "./index"
import { Course } from "../models"
import colors from "colors/safe"

export async function updateEditedGrade(
  stuID: string,
  courseID: string,
  year: number,
  term: number,
  eGrade: string,
): Promise<Course> {
  return new Promise((resolve, reject) =>
    db.serialize(() => {
      db.exec(
        `
      UPDATE STDPLAN SET EditedGrade = '${eGrade}'
      WHERE StudentID='${stuID}'
      AND CourseID='${courseID}'
      AND "Year"=${year}
      AND Term=${term}
      `,
        err => {
          if (err) console.error(colors.red(err.message))
        },
      )
      db.get(
        `
      SELECT P.CourseID, P."Year", P.Term, P.EditedGrade
      FROM STDPLAN P
      INNER JOIN COURSE C ON P.CourseID = C.CourseID
      WHERE P.StudentID = '${stuID}'
      AND   P.CourseID = '${courseID}'
      AND   P."Year" = ${year}
      AND   P.Term = ${term}
      `,
        (err, row) => {
          if (err) reject(err)
          resolve(row)
        },
      )
    }),
  )
}
