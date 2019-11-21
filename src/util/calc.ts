import { Course } from "../models"

export function GradeAvg(arr): string {
  let TotalCredit = 0
  let TotalPoint = 0
  for (let i in arr) {
    // console.log(arr[i].CourseCredit+" "+arr[i].Grade);
    if (arr[i].Grade === "A") {
      TotalCredit += arr[i].CourseCredit
      let point = arr[i].CourseCredit * 4.0
      TotalPoint += point
    } else if (arr[i].Grade === "B+") {
      TotalCredit += arr[i].CourseCredit
      let point = arr[i].CourseCredit * 3.5
      TotalPoint += point
    } else if (arr[i].Grade === "B") {
      TotalCredit += arr[i].CourseCredit
      let point = arr[i].CourseCredit * 3.0
      TotalPoint += point
    } else if (arr[i].Grade === "C+") {
      TotalCredit += arr[i].CourseCredit
      let point = arr[i].CourseCredit * 2.5
      TotalPoint += point
    } else if (arr[i].Grade === "C") {
      TotalCredit += arr[i].CourseCredit
      let point = arr[i].CourseCredit * 2.0
      TotalPoint += point
    } else if (arr[i].Grade === "D+") {
      TotalCredit += arr[i].CourseCredit
      let point = arr[i].CourseCredit * 1.5
      TotalPoint += point
    } else if (arr[i].Grade === "D") {
      TotalCredit += arr[i].CourseCredit
      let point = arr[i].CourseCredit * 1.0
      TotalPoint += point
    } else if (arr[i].Grade === "F") {
      TotalCredit += arr[i].CourseCredit
      let point = arr[i].CourseCredit * 0.0
      TotalPoint += point
    } else {
      continue
    }
  }
  let Avg = TotalPoint / (TotalCredit ? TotalCredit : 1)
  return Avg.toFixed(2)
}

export function percentRetired(accuGrade: number): number {
  return 100 - ((accuGrade - 1.75) / 2.25) * 100
}
