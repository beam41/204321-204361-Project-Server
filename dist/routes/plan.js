"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _select = require("../databases/select");

var _safe = _interopRequireDefault(require("colors/safe"));

var _auth = require("./auth");

var _update = require("../databases/update");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.get("/:id", _auth.requireJWTAuth, _auth.extractIdJwt, function (req, res) {
  // @ts-ignore
  if (req.user === req.params.id || req.userType === "advisor") (0, _select.getPlans)(req.params.id).then(function (val) {
    console.log("[" + new Date().toUTCString() + "] " + "[Express] " + "User " + // @ts-ignore
    _safe["default"].bold(req.user) + " gets " + (req.user === req.params.id ? "their" : req.params.id) + " plan");
    res.send(val);
  })["catch"](function (err) {
    return console.error(_safe["default"].red(err));
  });else res.status(403).send();
});
router.put("/:id", _auth.requireJWTAuth, _auth.extractIdJwt, function (req, res) {
  // @ts-ignore
  if (req.user === req.params.id) {
    // @ts-ignore
    (0, _update.updateEditedGrade)(req.params.id, req.body.CourseID, req.body.Year, req.body.Term, req.body.EditedGrade).then(function (val) {
      console.log("[" + new Date().toUTCString() + "] " + "[Express] " + "User " + // @ts-ignore
      _safe["default"].bold(req.user) + " edited grade to " + _safe["default"].bold(val.EditedGrade) + " in plan");
      res.send(val);
    });
  } else res.status(403).send();
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=plan.js.map