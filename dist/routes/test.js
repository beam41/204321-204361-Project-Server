"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _insert = require("../databases/insert");

var router = (0, _express.Router)();
router.post("/testStu", function (req, res) {
  (0, _insert.testInsert)();
  res.send("Hi");
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=test.js.map