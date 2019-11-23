import sqlite3 from "sqlite3"
import colors from "colors/safe"

const sql = sqlite3.verbose()

export const dbMem = new sql.Database(":memory:", err => {
  if (err) console.error(colors.red(err.message))
  else
    console.log(
      colors.green(
        "[" +
          new Date().toUTCString() +
          "] " +
          "[SQLite-UserNameMap] Created in memory database :)",
      ),
    )
})
export function runDB() {
  dbMem.run(
    `
  CREATE TABLE IF NOT EXISTS MAP (
    Id        INTEGER NOT NULL UNIQUE,
    Username  TEXT  NOT NULL,
    SocketId  INTEGER,
    PRIMARY KEY (Id)
  );
  `,
    err => {
      if (err) console.error(colors.red(err.message))
    },
  )
}

export function insertNew(Username: string, SocketId: string): void {
  dbMem.run(
    `
    INSERT OR REPLACE INTO MAP (Username, SocketId)
    VALUES ('${Username}', '${SocketId}')`,
    err => {
      if (err) console.error(colors.red(err.message))
    },
  )
}

export async function mapping(Username: string): Promise<any[]> {
  let found = []
  await new Promise((resolve, reject) =>
    dbMem.all(
      `
    SELECT  SocketId
    FROM    MAP
    WHERE   Username = '${Username}'
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then((value: any) => {
    if (value) found = value
  })
  return found
}
