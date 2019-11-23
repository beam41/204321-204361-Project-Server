"use strict";

require("dotenv/config");

require("babel-polyfill");

var _safe = _interopRequireDefault(require("colors/safe"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var _databases = require("./databases");

var _usedJwt = require("./databases/used-jwt");

var _usnMap = require("./databases/usn-map");

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _chat = _interopRequireDefault(require("./socket/chat"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_safe["default"].yellow("[" + new Date().toUTCString() + "] " + "This server is running in ".concat(process.env.NODE_ENV, " mode!")));
(0, _databases.runDB)();
(0, _usedJwt.runDB)();
(0, _usnMap.runDB)();
var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

var io = (0, _socket["default"])(server); //important middleware

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, "build"))); //routes

app.use("/api/auth", _routes["default"].auth);
app.use("/api/test", _routes["default"].test);
app.use("/api/request", _routes["default"].request);
app.use("/api/plan", _routes["default"].plan);
app.use("/api/chat", _routes["default"].chat);
app.use("/api/adv", _routes["default"].adv); // passing io

(0, _chat["default"])(io);
app.get("/api", function (req, res) {
  return res.send("Hi");
});
app.get("/", function (req, res) {
  res.sendFile(_path["default"].join(__dirname, "build", "index.html"));
}); //listen

var port = process.env.PORT || 3000;
server.listen(port, function () {
  return console.log(_safe["default"].green("[" + new Date().toUTCString() + "] " + "[Express] Server listening on port " + _safe["default"].bold("".concat(port))));
});
//# sourceMappingURL=index.js.map