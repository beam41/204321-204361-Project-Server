"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("./auth");

var _insert = require("../databases/insert");

var _select = require("../databases/select");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.post("/", _auth.requireJWTAuth, _auth.extractIdJwt, function (req, res) {
  // @ts-ignore
  if (req.userType === "student") {
    var bd = {
      // @ts-ignore
      StudentID: req.user,
      AdvisorID: req.body.to,
      Time: req.body.Time,
      Message: req.body.Message,
      SentBy: "student"
    }; // @ts-ignore

    (0, _insert.newChat)(bd);
    res.send([bd]);
  } else {
    var _bd = {
      StudentID: req.body.to,
      // @ts-ignore
      AdvisorID: req.user,
      Time: req.body.Time,
      Message: req.body.Message,
      SentBy: "advisor"
    }; // @ts-ignore

    (0, _insert.newChat)(_bd);
    res.send([_bd]);
  }
});
router.get("/", _auth.requireJWTAuth, _auth.extractIdJwt,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.userType === "student")) {
              _context.next = 14;
              break;
            }

            _context.t0 = res;
            _context.t1 = _select.getChat;
            _context.t2 = req.user;
            _context.next = 6;
            return (0, _select.getAdv)(req.user);

          case 6:
            _context.t3 = _context.sent;
            _context.t4 = req.query.latest;
            _context.next = 10;
            return (0, _context.t1)(_context.t2, _context.t3, _context.t4);

          case 10:
            _context.t5 = _context.sent;

            _context.t0.send.call(_context.t0, _context.t5);

            _context.next = 15;
            break;

          case 14:
            res.status(403).send();

          case 15:
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
router.get("/:id", _auth.requireJWTAuth, _auth.extractIdJwt,
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.userType === "advisor")) {
              _context2.next = 8;
              break;
            }

            _context2.t0 = res;
            _context2.next = 4;
            return (0, _select.getChat)(req.params.id, req.user, req.query.latest);

          case 4:
            _context2.t1 = _context2.sent;

            _context2.t0.send.call(_context2.t0, _context2.t1);

            _context2.next = 9;
            break;

          case 8:
            res.status(403).send();

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=chat.js.map