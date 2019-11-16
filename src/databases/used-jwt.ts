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
          "[SQLite-JWT] Created in memory database :)",
      ),
    )
})
export function runDB() {
  dbMem.run(
    `
  CREATE TABLE IF NOT EXISTS JWT (
    JwtCode     TEXT  NOT NULL  UNIQUE,
    expireTime  INTEGER,
    PRIMARY KEY (JwtCode)
  );
  `,
    err => {
      if (err) console.error(colors.red(err.message))
    },
  )

  setInterval(
    () =>
      dbMem.run(
        `
      DELETE FROM JWT
      WHERE expireTime < ${Date.now()}
  `,
        function(err) {
          if (err) console.error(colors.red(err.message))
          else if (this.changes > 0)
            console.log(
              "[" +
                new Date().toUTCString() +
                "] " +
                `[SQLite-JWT] ${this.changes} Row(s) deleted`,
            )
        },
      ),
    1_800_000,
  )
}

export function insertNew(jwt: string, expireTime: number): void {
  dbMem.run(
    `
    INSERT INTO JWT
    VALUES ('${jwt}', ${expireTime})`,
    err => {
      if (err) console.error(colors.red(err.message))
    },
  )
}

export async function findExpJwt(jwt: string): Promise<boolean> {
  let found = false
  await new Promise((resolve, reject) =>
    dbMem.get(
      `
    SELECT  *
    FROM    JWT
    WHERE   JwtCode = '${jwt}'
    `,
      (err, row) => {
        if (err) reject(err)
        else resolve(row)
      },
    ),
  ).then(value => {
    if (value) found = true
  })
  return found
}
