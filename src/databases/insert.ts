import { db } from "./index"
import fs from "fs"
import { CouseScrape } from "../models"

/**
 * for courseScraper to insert new courses to DB
 */
export function fromScraper(): void {
  db.exec("PRAGMA synchronous=OFF")
  console.log("[CourseScrape Insert] Hi!")
  let buff: string = fs.readFileSync("./course.json").toString()
  let arr = JSON.parse(buff)
  arr.forEach((val: CouseScrape) => {
    db.exec(
      `
    INSERT INTO COURSE (CourseID, CourseName, CourseCredit)
    VALUES ('${val.courseID}', '${val.courseName}', ${val.courseCredit});
    `,
      err => {
        if (err) console.log(err.message)
      },
    )
  })
}

export function testInsert(): void {
  db.exec(
    "INSERT INTO STUDENT VALUES ('600510569', 'Phumdol', 'Lookthipnapha', '000000000', 'project')",
    err => {
      if (err) console.log(err.message)
    },
  )
}
