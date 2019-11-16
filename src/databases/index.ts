import sqlite3 from "sqlite3"
import colors from "colors/safe"

const sql = sqlite3.verbose()

export const db = new sql.Database(process.env.DB, err => {
  if (err) console.error(colors.red(err.message))
  else
    console.log(
      colors.green(
        "[" +
          new Date().toUTCString() +
          "] " +
          "[SQLite] Connected to the database :)",
      ),
    )
})
// just in case it was turned off once
db.exec("PRAGMA synchronous=ON")

export function runDB() {
  db.serialize(() => {
    db.run(
      `
    CREATE TABLE IF NOT EXISTS ADVISOR (
      AdvisorID   CHARACTER(9)    NOT NULL    UNIQUE,
      AdvName     TEXT,
      AdvSurname  TEXT,
      Password    TEXT,
      PRIMARY KEY (AdvisorID)
    ) WITHOUT ROWID;
    `,
      err => {
        if (err) console.error(colors.red(err.message))
      },
    )
    db.run(
      `
    CREATE TABLE IF NOT EXISTS STUDENT (
      StudentID   CHARACTER(9)    NOT NULL    UNIQUE,
      StdName     TEXT,
      StdSurname  TEXT,
      AdvisorID   CHARACTER(9)    NOT NULL    DEFAULT 'A0',
      Password    TEXT,
      PerFailed   REAL,
      PRIMARY KEY (StudentID),
      FOREIGN KEY (AdvisorID)     REFERENCES  ADVISOR (AdvisorID)
      ON DELETE   SET DEFAULT
      ON UPDATE   CASCADE
    )   WITHOUT ROWID;
    `,
      err => {
        if (err) console.error(colors.red(err.message))
      },
    )
    db.run(
      `
    CREATE TABLE IF NOT EXISTS COURSE (
      CourseID      CHARACTER(6)    NOT NULL    UNIQUE,
      CourseName    TEXT,
      CourseCredit  INTEGER,
      PRIMARY KEY (CourseID)
    )   WITHOUT ROWID;
    `,
      err => {
        if (err) console.error(colors.red(err.message))
      },
    )
    db.run(
      `
    CREATE TABLE IF NOT EXISTS STDPLAN (
      StudentID   CHARACTER(9)    NOT NULL,
      CourseID    CHARACTER(6)    NOT NULL,
      Year        INTEGER,
      Term        INTEGER,
      Grade       CHARACTER(2),
      FOREIGN KEY (StudentID)     REFERENCES  STUDENT (StudentID)
      ON DELETE   CASCADE
      ON UPDATE   CASCADE
      FOREIGN KEY (CourseID)      REFERENCES  COURSE  (CourseID)
      ON DELETE   CASCADE
      ON UPDATE   CASCADE
    );
    `,
      err => {
        if (err) console.error(colors.red(err.message))
      },
    )
    db.run(
      `
    CREATE TABLE IF NOT EXISTS CHAT (
      ChatID      CHARACTER(10)   NOT NULL    UNIQUE,
      StudentID   CHARACTER(9)    NOT NULL,
      AdvisorID   CHARACTER(9)    NOT NULL,
      Time        INTEGER,
      Message     TEXT,
      SentBy      TEXT,
      Readed      INTEGER         DEFAULT 0,
      PRIMARY KEY (ChatID)
      FOREIGN KEY (StudentID)     REFERENCES  STUDENT (StudentID)
      FOREIGN KEY (AdvisorID)     REFERENCES  ADVISOR (AdvisorID)
      ON DELETE   CASCADE
      ON UPDATE   CASCADE
    );
    `,
      err => {
        if (err) console.error(colors.red(err.message))
      },
    )
  })
}
