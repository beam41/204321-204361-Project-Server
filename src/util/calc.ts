import { Course } from "../models"

function gradeCalc(courseGrades: Course[]): number {
  return (
    courseGrades.reduce((a, b) => a + +b.Grade * b.CourseCredit, 0) /
    courseGrades.reduce((a, b) => a + b.CourseCredit, 0)
  )
}

function percentRetired(accuGrade: number[]): number {
  if (accuGrade.length <=2) {

  }
  return 0
}
