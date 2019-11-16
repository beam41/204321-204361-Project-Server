import { db } from "./index"
import { Course, User } from "../models"
import colors from "colors/safe"

export function testInsert(): void {
  db.exec(
    "INSERT INTO STUDENT VALUES ('600510569', 'Phumdol', 'Lookthipnapha', '000000000', 'project')",
    err => {
      if (err) console.error(colors.red(err.message))
    },
  )
}

export async function insertCourses(arr: Course[]): Promise<void> {
  db.exec("PRAGMA synchronous=OFF")
  console.log(
    colors.green(
      "[" + new Date().toUTCString() + "] " + "[SQLite] Insert Courses!",
    ),
  )
  const progress = []
  arr.forEach(val => {
    progress.push(
      new Promise((resolve, reject) =>
        db.exec(
          `
        INSERT OR IGNORE INTO COURSE (CourseID, CourseName, CourseCredit)
        VALUES ('${val.courseID}', '${val.courseName}', ${val.courseCredit});
        `,
          err => {
            if (err) console.error(colors.red(err.message))
            resolve()
          },
        ),
      ),
    )
  })
  await Promise.all(progress)
  console.log(
    colors.green(
      "[" +
        new Date().toUTCString() +
        "] " +
        "[SQLite] Insert Courses complete!",
    ),
  )
  db.exec("PRAGMA synchronous=ON")
}

export async function insertUsers(arr: User[]): Promise<void> {
  db.exec("PRAGMA synchronous=OFF")
  console.log(
    colors.green(
      "[" + new Date().toUTCString() + "] " + "[SQLite] Insert Users!",
    ),
  )
  const adv = arr.filter(val => val.type === "adv")
  const std = arr.filter(val => val.type === "std")
  const progressAdv = []
  const progressStd = []
  adv.forEach(val => {
    progressAdv.push(
      new Promise((resolve, reject) =>
        db.exec(
          `
        INSERT OR REPLACE INTO ADVISOR (AdvisorID, AdvName, AdvSurname, Password)
        VALUES ('${val.ID}', '${val.name}', '${val.surname}', '${val.password}');
        `,
          err => {
            if (err) console.error(colors.red(err.message))
            resolve()
          },
        ),
      ),
    )
  })
  std.forEach(val => {
    progressStd.push(
      new Promise((resolve, reject) =>
        db.exec(
          `
        INSERT OR REPLACE INTO STUDENT (StudentID, StdName, StdSurname, AdvisorID, Password)
        VALUES ('${val.ID}', '${val.name}', '${val.surname}', '${val.advID}','${val.password}');
        `,
          err => {
            if (err) console.error(colors.red(err.message))
            resolve()
          },
        ),
      ),
    )
  })
  await Promise.all(progressAdv)
  await Promise.all(progressStd)
  console.log(
    colors.green(
      "[" + new Date().toUTCString() + "] " + "[SQLite] Insert Users complete!",
    ),
  )
  db.exec("PRAGMA synchronous=ON")
}

export async function insertPlans(arr: any[]): Promise<void> {
  db.exec("PRAGMA synchronous=OFF")
  console.log(
    colors.green(
      "[" + new Date().toUTCString() + "] " + "[SQLite] Insert Plans!",
    ),
  )
  const progress = []
  arr.forEach(val => {
    console.log(val.ID)
  })
  await Promise.all(progress)
  console.log(
    colors.green(
      "[" + new Date().toUTCString() + "] " + "[SQLite] Insert Plans complete!",
    ),
  )
  db.exec("PRAGMA synchronous=ON")
}
