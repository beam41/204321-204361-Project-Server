"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runDB = runDB;
exports.insertNew = insertNew;
exports.mapping = mapping;
exports.dbMem = void 0;

var _sqlite = _interopRequireDefault(require("sqlite3"));

var _safe = _interopRequireDefault(require("colors/safe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sql = _sqlite["default"].verbose();

var dbMem = new sql.Database(":memory:", function (err) {
  if (err) console.error(_safe["default"].red(err.message));else console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[SQLite-UserNameMap] Created in memory database :)"));
});
exports.dbMem = dbMem;

function runDB() {
  dbMem.run("\n  CREATE TABLE IF NOT EXISTS MAP (\n    Id        INTEGER NOT NULL UNIQUE,\n    Username  TEXT  NOT NULL,\n    SocketId  INTEGER,\n    PRIMARY KEY (Id)\n  );\n  ", function (err) {
    if (err) console.error(_safe["default"].red(err.message));
  });
}

function insertNew(Username, SocketId) {
  dbMem.run("\n    INSERT OR REPLACE INTO MAP (Username, SocketId)\n    VALUES ('".concat(Username, "', '").concat(SocketId, "')"), function (err) {
    if (err) console.error(_safe["default"].red(err.message));
  });
}

function mapping(_x) {
  return _mapping.apply(this, arguments);
}

function _mapping() {
  _mapping = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(Username) {
    var found;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            found = [];
            _context.next = 3;
            return new Promise(function (resolve, reject) {
              return dbMem.all("\n    SELECT  SocketId\n    FROM    MAP\n    WHERE   Username = '".concat(Username, "'\n    "), function (err, row) {
                if (err) reject(err);else resolve(row);
              });
            }).then(function (value) {
              if (value) found = value;
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
  return _mapping.apply(this, arguments);
}
//# sourceMappingURL=usn-map.js.map