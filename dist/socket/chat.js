"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = chat;

var _usnMap = require("../databases/usn-map");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function chat(io) {
  io.on("connection", function (socket) {
    console.log("[" + new Date().toUTCString() + "] " + "[SocketIO] Someone has established connection");
    var sesName = "";
    socket.on("tellname", function (obj) {
      console.log("[" + new Date().toUTCString() + "] " + "[SocketIO] ".concat(obj.name, " has joined as ").concat(socket.id));
      sesName = obj.name;
      (0, _usnMap.insertNew)(obj.name, socket.id);
    });
    socket.on("msgTo",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(obj) {
        var mapped;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _usnMap.mapping)(obj.username);

              case 2:
                mapped = _context.sent;
                mapped.forEach(function (val) {
                  io.to("".concat(val.SocketId)).emit("msg", obj.message);
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    socket.on("disconnect", function () {
      return console.log("[" + new Date().toUTCString() + "] " + "[SocketIO] ".concat(sesName ? sesName : "Someone", " disconnected"));
    });
  });
}
//# sourceMappingURL=chat.js.map