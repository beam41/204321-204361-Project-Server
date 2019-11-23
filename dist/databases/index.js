"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runDB = runDB;
exports.db = void 0;

var _sqlite = _interopRequireDefault(require("sqlite3"));

var _safe = _interopRequireDefault(require("colors/safe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sql = _sqlite["default"].verbose();

var db = new sql.Database(process.env.DB, function (err) {
  if (err) console.error(_safe["default"].red(err.message));else console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[SQLite] Connected to the database :)"));
}); // just in case it was turned off once

exports.db = db;
db.exec("PRAGMA synchronous=ON");

function runDB() {
  db.serialize(function () {
    db.run("\n    CREATE TABLE IF NOT EXISTS ADVISOR (\n      AdvisorID   CHARACTER(9)    NOT NULL    UNIQUE,\n      AdvName     TEXT,\n      AdvSurname  TEXT,\n      Password    TEXT,\n      PRIMARY KEY (AdvisorID)\n    ) WITHOUT ROWID;\n    ", function (err) {
      if (err) console.error(_safe["default"].red(err.message));
    });
    db.run("\n    CREATE TABLE IF NOT EXISTS STUDENT (\n      StudentID   CHARACTER(9)    NOT NULL    UNIQUE,\n      StdName     TEXT,\n      StdSurname  TEXT,\n      AdvisorID   CHARACTER(9)    NOT NULL    DEFAULT 'A0',\n      Password    TEXT,\n      PerFailed   REAL,\n      PRIMARY KEY (StudentID),\n      FOREIGN KEY (AdvisorID)     REFERENCES  ADVISOR (AdvisorID)\n      ON DELETE   SET DEFAULT\n      ON UPDATE   CASCADE\n    )   WITHOUT ROWID;\n    ", function (err) {
      if (err) console.error(_safe["default"].red(err.message));
    });
    db.run("\n    CREATE TABLE IF NOT EXISTS COURSE (\n      CourseID      CHARACTER(6)    NOT NULL    UNIQUE,\n      CourseName    TEXT,\n      CourseCredit  INTEGER,\n      PRIMARY KEY (CourseID)\n    )   WITHOUT ROWID;\n    ", function (err) {
      if (err) console.error(_safe["default"].red(err.message));
    });
    db.run("\n    CREATE TABLE IF NOT EXISTS STDPLAN (\n      StudentID   CHARACTER(9)    NOT NULL,\n      CourseID    CHARACTER(6)    NOT NULL,\n      Year        INTEGER,\n      Term        INTEGER,\n      Grade       CHARACTER(2),\n      EditedGrade CHARACTER(2),\n      PRIMARY KEY (StudentID, CourseID, Year, Term)\n      FOREIGN KEY (StudentID)     REFERENCES  STUDENT (StudentID)\n      ON DELETE   CASCADE\n      ON UPDATE   CASCADE\n      FOREIGN KEY (CourseID)      REFERENCES  COURSE  (CourseID)\n      ON DELETE   CASCADE\n      ON UPDATE   CASCADE\n    );\n    ", function (err) {
      if (err) console.error(_safe["default"].red(err.message));
    });
    db.run("\n    CREATE TABLE IF NOT EXISTS CHAT (\n      ChatID      INTEGER         NOT NULL    UNIQUE,\n      StudentID   CHARACTER(9)    NOT NULL,\n      AdvisorID   CHARACTER(9)    NOT NULL,\n      Time        INTEGER,\n      Message     TEXT,\n      SentBy      TEXT,\n      PRIMARY KEY (ChatID)\n      FOREIGN KEY (StudentID)     REFERENCES  STUDENT (StudentID)\n      FOREIGN KEY (AdvisorID)     REFERENCES  ADVISOR (AdvisorID)\n      ON DELETE   CASCADE\n      ON UPDATE   CASCADE\n    );\n    ", function (err) {
      if (err) console.error(_safe["default"].red(err.message));
    });
  });
}
//# sourceMappingURL=index.js.map