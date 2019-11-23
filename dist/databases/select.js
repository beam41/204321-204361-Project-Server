"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareUP = compareUP;
exports.findUser = findUser;
exports.getPlans = getPlans;
exports.getChat = getChat;
exports.getAdv = getAdv;
exports.getStuList = getStuList;

var _index = require("./index");

var _calc = require("../util/calc");

var _safe = _interopRequireDefault(require("colors/safe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * compare Username and Password
 *
 * promise value will be true if match
 */
function compareUP(_x, _x2) {
  return _compareUP.apply(this, arguments);
}
/**
 * find User by username
 *
 * promise value will be true if match
 *
 * It's compareUP w/o password
 */


function _compareUP() {
  _compareUP = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(username, password) {
    var found;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            found = null;
            _context.next = 3;
            return new Promise(function (resolve, reject) {
              return _index.db.get("\n    SELECT  StudentID\n    FROM    STUDENT\n    WHERE   StudentID = '".concat(username, "'\n    AND     Password = '").concat(password, "'\n    "), function (err, row) {
                if (err) reject(err);else resolve(row);
              });
            }).then(function (value) {
              if (value) found = "student";
            });

          case 3:
            _context.next = 5;
            return new Promise(function (resolve, reject) {
              return _index.db.get("\n    SELECT  AdvisorID\n    FROM    ADVISOR\n    WHERE   AdvisorID = '".concat(username, "'\n    AND     Password = '").concat(password, "'\n    "), function (err, row) {
                if (err) reject(err);else resolve(row);
              });
            }).then(function (value) {
              if (value && !found) found = "advisor";
            });

          case 5:
            return _context.abrupt("return", found);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _compareUP.apply(this, arguments);
}

function findUser(_x3) {
  return _findUser.apply(this, arguments);
}

function _findUser() {
  _findUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(username) {
    var found;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            found = null;
            _context2.next = 3;
            return new Promise(function (resolve, reject) {
              return _index.db.get("\n    SELECT  StudentID\n    FROM    STUDENT\n    WHERE   StudentID = '".concat(username, "'\n    "), function (err, row) {
                if (err) reject(err);else resolve(row);
              });
            }).then(function (value) {
              if (value) found = true;
            });

          case 3:
            _context2.next = 5;
            return new Promise(function (resolve, reject) {
              return _index.db.get("\n    SELECT  AdvisorID\n    FROM    ADVISOR\n    WHERE   AdvisorID = '".concat(username, "'\n    "), function (err, row) {
                if (err) reject(err);else resolve(row);
              });
            }).then(function (value) {
              if (value && !found) found = true;
            });

          case 5:
            return _context2.abrupt("return", found);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _findUser.apply(this, arguments);
}

function getPlans(_x4) {
  return _getPlans.apply(this, arguments);
}

function _getPlans() {
  _getPlans = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(stuID) {
    var found;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new Promise(function (resolve, reject) {
              return _index.db.all("\n      SELECT P.CourseID, C.CourseName, P.\"Year\", P.Term, P.Grade, P.EditedGrade, C.CourseCredit\n      FROM STDPLAN P\n      INNER JOIN COURSE C ON P.CourseID = C.CourseID\n      WHERE P.StudentID = '".concat(stuID, "'\n      ORDER BY P.\"Year\", P.Term, P.CourseID\n    "), function (err, row) {
                if (err) reject(err);else {
                  var solve = [];
                  row.forEach(function (val) {
                    if (val.Grade !== "P") {
                      solve.push({
                        CourseID: val.CourseID,
                        CourseName: val.CourseName,
                        CourseCredit: val.CourseCredit,
                        Year: val.Year,
                        Term: val.Term,
                        Grade: val.Grade
                      });
                    } else solve.push(val);
                  });
                  resolve(solve);
                }
              });
            }).then(function (value) {
              if (value) found = value;
            });

          case 2:
            return _context3.abrupt("return", found);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getPlans.apply(this, arguments);
}

function getChat(_x5, _x6, _x7) {
  return _getChat.apply(this, arguments);
}

function _getChat() {
  _getChat = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(stuID, advID, time) {
    var found;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return new Promise(function (resolve, reject) {
              return _index.db.all("\n      SELECT \tStudentID, AdvisorID, Time, Message, SentBy\n      FROM \tCHAT\n      WHERE \tStudentID = '".concat(stuID, "'\n      AND\t\tAdvisorID = '").concat(advID, "'\n      AND\t\tTime > ").concat(time, "\n    "), function (err, row) {
                if (err) reject(err);else resolve(row);
              });
            }).then(function (value) {
              if (value) found = value;
            });

          case 2:
            return _context4.abrupt("return", found);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getChat.apply(this, arguments);
}

function getAdv(_x8) {
  return _getAdv.apply(this, arguments);
}

function _getAdv() {
  _getAdv = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(stuID) {
    var found;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return new Promise(function (resolve, reject) {
              return _index.db.get("\n      SELECT \tAdvisorID\n      FROM\tSTUDENT\n      WHERE\tStudentID = '".concat(stuID, "'\n    "), function (err, row) {
                if (err) reject(err);else resolve(row);
              });
            }).then(function (value) {
              if (value) found = value.AdvisorID;
            });

          case 2:
            return _context5.abrupt("return", found);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getAdv.apply(this, arguments);
}

function getStuList(_x9) {
  return _getStuList.apply(this, arguments);
}

function _getStuList() {
  _getStuList = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(advId) {
    var found;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            found = [];
            _context6.next = 3;
            return new Promise(function (resolve, reject) {
              return _index.db.all("\n      SELECT \tStudentID, StdName, StdSurname, PerFailed\n      FROM\t  STUDENT\n      WHERE\t  AdvisorID = '".concat(advId, "'\n    "), function (err, row) {
                if (err) reject(err);else resolve(row);
              });
            }).then(function (value) {
              if (value) value.forEach(function (val) {
                var failed = val.PerFailed;

                if (!failed) {
                  getPlans(val.StudentID).then(function (v) {
                    var grade = +(0, _calc.GradeAvg)(v);
                    failed = (0, _calc.percentRetired)(grade);

                    _index.db.exec("\n              UPDATE STUDENT SET PerFailed = ".concat(failed, "\n              WHERE StudentID = '").concat(val.StudentID, "'\n            "), function (err) {
                      if (err) console.error(_safe["default"].red(err.message));
                    });
                  });
                }

                found.push(_objectSpread({}, val, {
                  PerFailed: failed
                }));
              });
            });

          case 3:
            return _context6.abrupt("return", found);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getStuList.apply(this, arguments);
}
//# sourceMappingURL=select.js.map