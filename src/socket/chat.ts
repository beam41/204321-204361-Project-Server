import socketio from "socket.io"
import { insertNew, mapping } from "../databases/usn-map"

export default function chat(io: socketio.Server): void {
  io.on("connection", socket => {
    console.log(
      "[" +
        new Date().toUTCString() +
        "] " +
        `[SocketIO] Someone has established connection`,
    )
    let sesName = ""
    socket.on("tellname", obj => {
      console.log(
        "[" +
          new Date().toUTCString() +
          "] " +
          `[SocketIO] ${obj.name} has joined as ${socket.id}`,
      )
      sesName = obj.name
      insertNew(obj.name, socket.id)
    })

    socket.on("msgTo", async obj => {
      const mapped: any[] = await mapping(obj.username)
      mapped.forEach(val => {
        io.to(`${val.SocketId}`).emit("msg", obj.message)
      })
    })

    socket.on("disconnect", () =>
      console.log(
        "[" +
          new Date().toUTCString() +
          "] " +
          `[SocketIO] ${sesName ? sesName : "Someone"} disconnected`,
      ),
    )
  })
}
