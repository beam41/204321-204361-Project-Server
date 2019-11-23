"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./auth"));

var _test = _interopRequireDefault(require("./test"));

var _request = _interopRequireDefault(require("./request"));

var _plan = _interopRequireDefault(require("./plan"));

var _chat = _interopRequireDefault(require("./chat"));

var _adv = _interopRequireDefault(require("./adv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  auth: _auth["default"],
  test: _test["default"],
  request: _request["default"],
  plan: _plan["default"],
  chat: _chat["default"],
  adv: _adv["default"]
};
exports["default"] = _default;
//# sourceMappingURL=index.js.map