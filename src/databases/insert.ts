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
  console.log(
    colors.green(
      "[" + new Date().toUTCString() + "] " + "[SQLite] Insert Courses!",
    ),
  )
  const all = arr.map(
    val =>
      `('${val.CourseID}', '${val.CourseName.replace(/\'/g, "''")}', ${
        val.CourseCredit
      })`,
  )
  const strall = all.join(",")
  await new Promise((resolve, reject) =>
    db.exec(
      `
        INSERT OR IGNORE INTO COURSE (CourseID, CourseName, CourseCredit)
        VALUES ${strall};
        `,
      err => {
        if (err) console.error(colors.red(err.message))
        resolve()
      },
    ),
  )
  console.log(
    colors.green(
      "[" +
        new Date().toUTCString() +
        "] " +
        "[SQLite] Insert Courses complete!",
    ),
  )
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
    val.plans.forEach((val2: Course) => {
      progress.push(
        new Promise((resolve, reject) =>
          db.exec(
            `
            INSERT OR REPLACE INTO STDPLAN (StudentID, CourseID, Year, Term, Grade)
            VALUES ('${val.ID}', '${val2.CourseID}', '${val2.Year}', '${val2.Term}','${val2.Grade}');
          `,
            err => {
              if (err) console.error(colors.red(err.message))
              resolve()
            },
          ),
        ),
      )
    })
  })
  await Promise.all(progress)
  console.log(
    colors.green(
      "[" + new Date().toUTCString() + "] " + "[SQLite] Insert Plans complete!",
    ),
  )
  db.exec("PRAGMA synchronous=ON")
}
