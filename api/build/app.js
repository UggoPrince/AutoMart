"use strict";

require("babel-polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("./server/index"));

var _Database = _interopRequireDefault(require("./server/database/Database"));

var _Tables = require("./server/database/Tables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var port = process.env.PORT || 4000;
var db = new _Database["default"]();
db.pool.query(_Tables.createTables,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(err) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (err) console.log(err); // await db.query(seedUsers);
            // await db.query(seedCars);

          case 1:
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

_index["default"].listen(port, function () {
  return console.log("App listening on port ".concat(port, "!"));
});
//# sourceMappingURL=app.js.map