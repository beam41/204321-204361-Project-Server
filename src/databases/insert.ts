import { db } from "./index"
import fs from "fs"

export function testInsert(): void {
  db.exec(
    "INSERT INTO STUDENT VALUES ('600510569', 'Phumdol', 'Lookthipnapha', '000000000', 'project')",
    err => {
      if (err) console.error(err.message)
    },
  )
}
