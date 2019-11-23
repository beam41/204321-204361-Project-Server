"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runDB = runDB;
exports.insertNew = insertNew;
exports.findExpJwt = findExpJwt;
exports.dbMem = void 0;

var _sqlite = _interopRequireDefault(require("sqlite3"));

var _safe = _interopRequireDefault(require("colors/safe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sql = _sqlite["default"].verbose();

var dbMem = new sql.Database(":memory:", function (err) {
  if (err) console.error(_safe["default"].red(err.message));else console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[SQLite-JWT] Created in memory database :)"));
});
exports.dbMem = dbMem;

function runDB() {
  dbMem.run("\n  CREATE TABLE IF NOT EXISTS JWT (\n    JwtCode     TEXT  NOT NULL  UNIQUE,\n    expireTime  INTEGER,\n    PRIMARY KEY (JwtCode)\n  );\n  ", function (err) {
    if (err) console.error(_safe["default"].red(err.message));
  });
  setInterval(function () {
    return dbMem.run("\n      DELETE FROM JWT\n      WHERE expireTime < ".concat(Date.now(), "\n  "), function (err) {
      if (err) console.error(_safe["default"].red(err.message));else if (this.changes > 0) console.log("[" + new Date().toUTCString() + "] " + "[SQLite-JWT] ".concat(this.changes, " Row(s) deleted"));
    });
  }, 1800000);
}

function insertNew(jwt, expireTime) {
  dbMem.run("\n    INSERT INTO JWT\n    VALUES ('".concat(jwt, "', ").concat(expireTime, ")"), function (err) {
    if (err) console.error(_safe["default"].red(err.message));
  });
}

function findExpJwt(_x) {
  return _findExpJwt.apply(this, arguments);
}

function _findExpJwt() {
  _findExpJwt = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(jwt) {
    var found;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            found = false;
            _context.next = 3;
            return new Promise(function (resolve, reject) {
              return dbMem.get("\n    SELECT  *\n    FROM    JWT\n    WHERE   JwtCode = '".concat(jwt, "'\n    "), function (err, row) {
                if (err) reject(err);else resolve(row);
              });
            }).then(function (value) {
              if (value) found = true;
            });

          case 3:
            return _context.abrupt("return", found);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findExpJwt.apply(this, arguments);
}
//# sourceMappingURL=used-jwt.js.map