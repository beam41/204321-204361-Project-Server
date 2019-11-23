"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractIdJwt = extractIdJwt;
exports["default"] = exports.requireJWTAuth = void 0;

var _express = require("express");

var _jwtSimple = _interopRequireDefault(require("jwt-simple"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _safe = _interopRequireDefault(require("colors/safe"));

var _select = require("../databases/select");

var _usedJwt = require("../databases/used-jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)(); //JWT and Passport

var jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRET
};
var jwtAuth = new _passportJwt.Strategy(jwtOptions,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(payload, done) {
    var reJwt;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reJwt = _jwtSimple["default"].encode(payload, process.env.SECRET);
            _context.next = 3;
            return (0, _select.findUser)(payload.sub);

          case 3:
            _context.t0 = _context.sent;

            if (!_context.t0) {
              _context.next = 8;
              break;
            }

            _context.next = 7;
            return (0, _usedJwt.findExpJwt)(reJwt);

          case 7:
            _context.t0 = !_context.sent;

          case 8:
            if (!_context.t0) {
              _context.next = 12;
              break;
            }

            done(null, true);
            _context.next = 13;
            break;

          case 12:
            done(null, false);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

_passport["default"].use(jwtAuth); //login middleware


var requireJWTAuth = _passport["default"].authenticate("jwt", {
  session: false
}); //login check


exports.requireJWTAuth = requireJWTAuth;
router.get("/test", requireJWTAuth, extractIdJwt, function (req, res) {
  res.send("".concat(req.user, " is here!"));
});
router.post("/login",
/*#__PURE__*/
// login check handler
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _select.compareUP)(req.body.username, req.body.password);

          case 2:
            req.type = _context2.sent;
            _context2.next = 5;
            return (0, _select.compareUP)(req.body.username, req.body.password);

          case 5:
            if (!_context2.sent) {
              _context2.next = 9;
              break;
            }

            next();
            _context2.next = 10;
            break;

          case 9:
            res.status(400).send("UsnPwd");

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}(),
/*#__PURE__*/
// return payload
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var time, payload;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            time = Math.trunc(Date.now() / 1000);
            payload = {
              sub: req.body.username,
              iat: time,
              exp: time + +process.env.TIMEOUT,
              // @ts-ignore
              typ: req.type
            };
            _context3.t0 = res;
            _context3.t1 = _jwtSimple["default"].encode(payload, process.env.SECRET);
            _context3.t2 = req.body.username;
            _context3.t3 = req.type;
            _context3.t4 = time + +process.env.TIMEOUT;
            _context3.next = 9;
            return (0, _select.getAdv)(req.body.username);

          case 9:
            _context3.t5 = _context3.sent;
            _context3.t6 = {
              jwt: _context3.t1,
              username: _context3.t2,
              userType: _context3.t3,
              expireOn: _context3.t4,
              adv: _context3.t5
            };

            _context3.t0.send.call(_context3.t0, _context3.t6);

            console.log("[" + new Date().toUTCString() + "] " + "[Express] User " + _safe["default"].bold(req.body.username) + " is logging in.");

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}());
router.post("/logout", requireJWTAuth, extractIdJwt,
/*#__PURE__*/
// return payload
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            (0, _usedJwt.insertNew)(req.header("Authorization"), _jwtSimple["default"].decode(req.header("Authorization"), process.env.SECRET).exp * 1000);
            res.send("done");
            console.log("[" + new Date().toUTCString() + "] " + "[Express] User " + // @ts-ignore
            _safe["default"].bold(req.user) + " is logged out.");

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}());

function extractIdJwt(_x10, _x11, _x12) {
  return _extractIdJwt.apply(this, arguments);
}

function _extractIdJwt() {
  _extractIdJwt = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res, next) {
    var jwtDec;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            jwtDec = _jwtSimple["default"].decode(req.header("Authorization"), process.env.SECRET);
            req.user = jwtDec.sub;
            req.userType = jwtDec.typ;
            next();

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _extractIdJwt.apply(this, arguments);
}

var _default = router;
exports["default"] = _default;
//# sourceMappingURL=auth.js.map