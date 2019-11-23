"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEditedGrade = updateEditedGrade;

var _index = require("./index");

var _safe = _interopRequireDefault(require("colors/safe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function updateEditedGrade(_x, _x2, _x3, _x4, _x5) {
  return _updateEditedGrade.apply(this, arguments);
}

function _updateEditedGrade() {
  _updateEditedGrade = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(stuID, courseID, year, term, eGrade) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              return _index.db.serialize(function () {
                _index.db.exec("\n      UPDATE STDPLAN SET EditedGrade = '".concat(eGrade, "'\n      WHERE StudentID='").concat(stuID, "'\n      AND CourseID='").concat(courseID, "'\n      AND \"Year\"=").concat(year, "\n      AND Term=").concat(term, "\n      "), function (err) {
                  if (err) console.error(_safe["default"].red(err.message));
                });

                _index.db.get("\n      SELECT P.CourseID, P.\"Year\", P.Term, P.EditedGrade\n      FROM STDPLAN P\n      INNER JOIN COURSE C ON P.CourseID = C.CourseID\n      WHERE P.StudentID = '".concat(stuID, "'\n      AND   P.CourseID = '").concat(courseID, "'\n      AND   P.\"Year\" = ").concat(year, "\n      AND   P.Term = ").concat(term, "\n      "), function (err, row) {
                  if (err) reject(err);
                  resolve(row);
                });
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateEditedGrade.apply(this, arguments);
}
//# sourceMappingURL=update.js.map