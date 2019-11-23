"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testInsert = testInsert;
exports.insertCourses = insertCourses;
exports.insertUsers = insertUsers;
exports.insertPlans = insertPlans;
exports.newChat = newChat;

var _index = require("./index");

var _safe = _interopRequireDefault(require("colors/safe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function testInsert() {
  _index.db.exec("INSERT INTO STUDENT VALUES ('600510569', 'Phumdol', 'Lookthipnapha', '000000000', 'project')", function (err) {
    if (err) console.error(_safe["default"].red(err.message));
  });
}

function insertCourses(_x) {
  return _insertCourses.apply(this, arguments);
}

function _insertCourses() {
  _insertCourses = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(arr) {
    var all, strall;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[SQLite] Insert Courses!"));
            all = arr.map(function (val) {
              return "('".concat(val.CourseID, "', '").concat(val.CourseName.replace(/\'/g, "''"), "', ").concat(val.CourseCredit, ")");
            });
            strall = all.join(",");
            _context.next = 5;
            return new Promise(function (resolve, reject) {
              return _index.db.exec("\n        INSERT OR IGNORE INTO COURSE (CourseID, CourseName, CourseCredit)\n        VALUES ".concat(strall, ";\n        "), function (err) {
                if (err) console.error(_safe["default"].red(err.message));
                resolve();
              });
            });

          case 5:
            console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[SQLite] Insert Courses complete!"));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _insertCourses.apply(this, arguments);
}

function insertUsers(_x2) {
  return _insertUsers.apply(this, arguments);
}

function _insertUsers() {
  _insertUsers = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(arr) {
    var adv, std, progressAdv, progressStd;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _index.db.exec("PRAGMA synchronous=OFF");

            console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[SQLite] Insert Users!"));
            adv = arr.filter(function (val) {
              return val.type === "adv";
            });
            std = arr.filter(function (val) {
              return val.type === "std";
            });
            progressAdv = [];
            progressStd = [];
            adv.forEach(function (val) {
              progressAdv.push(new Promise(function (resolve, reject) {
                return _index.db.exec("\n        INSERT OR REPLACE INTO ADVISOR (AdvisorID, AdvName, AdvSurname, Password)\n        VALUES ('".concat(val.ID, "', '").concat(val.name, "', '").concat(val.surname, "', '").concat(val.password, "');\n        "), function (err) {
                  if (err) console.error(_safe["default"].red(err.message));
                  resolve();
                });
              }));
            });
            std.forEach(function (val) {
              progressStd.push(new Promise(function (resolve, reject) {
                return _index.db.exec("\n        INSERT OR REPLACE INTO STUDENT (StudentID, StdName, StdSurname, AdvisorID, Password)\n        VALUES ('".concat(val.ID, "', '").concat(val.name, "', '").concat(val.surname, "', '").concat(val.advID, "','").concat(val.password, "');\n        "), function (err) {
                  if (err) console.error(_safe["default"].red(err.message));
                  resolve();
                });
              }));
            });
            _context2.next = 10;
            return Promise.all(progressAdv);

          case 10:
            _context2.next = 12;
            return Promise.all(progressStd);

          case 12:
            console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[SQLite] Insert Users complete!"));

            _index.db.exec("PRAGMA synchronous=ON");

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _insertUsers.apply(this, arguments);
}

function insertPlans(_x3) {
  return _insertPlans.apply(this, arguments);
}

function _insertPlans() {
  _insertPlans = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(arr) {
    var progress;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _index.db.exec("PRAGMA synchronous=OFF");

            console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[SQLite] Insert Plans!"));
            progress = [];
            arr.forEach(function (val) {
              val.plans.forEach(function (val2) {
                progress.push(new Promise(function (resolve, reject) {
                  return _index.db.exec("\n            INSERT OR REPLACE INTO STDPLAN (StudentID, CourseID, Year, Term, Grade)\n            VALUES ('".concat(val.ID, "', '").concat(val2.CourseID, "', '").concat(val2.Year, "', '").concat(val2.Term, "','").concat(val2.Grade, "');\n          "), function (err) {
                    if (err) console.error(_safe["default"].red(err.message));
                    resolve();
                  });
                }));
              });
            });
            _context3.next = 6;
            return Promise.all(progress);

          case 6:
            console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[SQLite] Insert Plans complete!"));

            _index.db.exec("PRAGMA synchronous=ON");

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _insertPlans.apply(this, arguments);
}

function newChat(_x4) {
  return _newChat.apply(this, arguments);
}

function _newChat() {
  _newChat = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(val) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return new Promise(function (resolve, reject) {
              return _index.db.exec("\n        INSERT OR IGNORE INTO CHAT (StudentID, AdvisorID, Time, Message, SentBy)\n        VALUES ('".concat(val.StudentID, "', '").concat(val.AdvisorID, "', ").concat(val.Time, ", '").concat(val.Message, "', '").concat(val.SentBy, "');\n        "), function (err) {
                if (err) console.error(_safe["default"].red(err.message));
                resolve();
              });
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _newChat.apply(this, arguments);
}
//# sourceMappingURL=insert.js.map