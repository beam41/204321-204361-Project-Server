import { Course } from "../models"

function gradeCalc(courseGrades: Course[]): number {
  return (
    courseGrades.reduce((a, b) => a + b.courseGrade * b.courseCredit, 0) /
    courseGrades.reduce((a, b) => a + b.courseCredit, 0)
  )
}

function percentRetired(accuGrade: number[]): number {
  if (accuGrade.length <=2) {

  }
  return 0
}
