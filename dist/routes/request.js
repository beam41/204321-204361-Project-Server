"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var connect = _interopRequireWildcard(require("../util/connect"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.post("/users", function (req, res) {
  console.log("[" + new Date().toUTCString() + "] " + "[Express] requested to fetch users");
  connect.fetchUser();
  res.send("try to fetch user now!");
});
router.post("/courses", function (req, res) {
  console.log("[" + new Date().toUTCString() + "] " + "[Express] requested to fetch courses");
  connect.fetchCourse();
  res.send("try to fetch course now!");
});
router.post("/plans", function (req, res) {
  console.log("[" + new Date().toUTCString() + "] " + "[Express] requested to fetch student plan");
  connect.fetchPlan();
  res.send("try to fetch plan now!");
});
router.post("/plans/:id", function (req, res) {
  console.log("[" + new Date().toUTCString() + "] " + "[Express] requested to fetch student plan");
  connect.fetchPlan(req.params.id);
  res.send("try to fetch plan now!");
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=request.js.map