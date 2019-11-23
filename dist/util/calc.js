"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GradeAvg = GradeAvg;
exports.percentRetired = percentRetired;

function GradeAvg(arr) {
  var TotalCredit = 0;
  var TotalPoint = 0;

  for (var i in arr) {
    // console.log(arr[i].CourseCredit+" "+arr[i].Grade);
    if (arr[i].Grade === "A") {
      TotalCredit += arr[i].CourseCredit;
      var point = arr[i].CourseCredit * 4.0;
      TotalPoint += point;
    } else if (arr[i].Grade === "B+") {
      TotalCredit += arr[i].CourseCredit;

      var _point = arr[i].CourseCredit * 3.5;

      TotalPoint += _point;
    } else if (arr[i].Grade === "B") {
      TotalCredit += arr[i].CourseCredit;

      var _point2 = arr[i].CourseCredit * 3.0;

      TotalPoint += _point2;
    } else if (arr[i].Grade === "C+") {
      TotalCredit += arr[i].CourseCredit;

      var _point3 = arr[i].CourseCredit * 2.5;

      TotalPoint += _point3;
    } else if (arr[i].Grade === "C") {
      TotalCredit += arr[i].CourseCredit;

      var _point4 = arr[i].CourseCredit * 2.0;

      TotalPoint += _point4;
    } else if (arr[i].Grade === "D+") {
      TotalCredit += arr[i].CourseCredit;

      var _point5 = arr[i].CourseCredit * 1.5;

      TotalPoint += _point5;
    } else if (arr[i].Grade === "D") {
      TotalCredit += arr[i].CourseCredit;

      var _point6 = arr[i].CourseCredit * 1.0;

      TotalPoint += _point6;
    } else if (arr[i].Grade === "F") {
      TotalCredit += arr[i].CourseCredit;

      var _point7 = arr[i].CourseCredit * 0.0;

      TotalPoint += _point7;
    } else {
      continue;
    }
  }

  var Avg = TotalPoint / (TotalCredit ? TotalCredit : 1);
  return Avg.toFixed(2);
}

function percentRetired(accuGrade) {
  return 100 - (accuGrade - 1.75) / 2.25 * 100;
}
//# sourceMappingURL=calc.js.map