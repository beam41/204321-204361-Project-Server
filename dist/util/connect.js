"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchUser = fetchUser;
exports.fetchPlan = fetchPlan;
exports.fetchCourse = fetchCourse;

var _axios2 = _interopRequireDefault(require("axios"));

var _safe = _interopRequireDefault(require("colors/safe"));

var _insert = require("../databases/insert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var axios = _axios2["default"].create({
  baseURL: process.env.REGURL
});
/**
 * fetching new user
 *
 * this method need manually running by remote reg server
 *
 */


function fetchUser() {
  axios.get("/users").then(function (value) {
    (0, _insert.insertUsers)(value.data);
  }, function (err) {
    return console.error(_safe["default"].red(err));
  });
}
/**
 * fetch student plan
 *
 * this method is run if user plan is not cached (with id) <-- maybe, not implement yet
 *
 * it's can be manually run by remote regserver
 *
 */


function fetchPlan(id) {
  axios.get("/plans/".concat(id ? id : "")).then(function (value) {
    (0, _insert.insertPlans)(value.data);
  }, function (err) {
    return console.error(_safe["default"].red(err));
  });
}
/**
 * fetch course and cache on server
 *
 * it's can be manually run by remote regserver
 *
 */


function fetchCourse() {
  axios.get("/courses").then(function (value) {
    (0, _insert.insertCourses)(value.data);
  }, function (err) {
    return console.error(_safe["default"].red(err));
  });
}
//# sourceMappingURL=connect.js.map