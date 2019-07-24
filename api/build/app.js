"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _debug = _interopRequireDefault(require("debug"));

var _index = _interopRequireDefault(require("./server/index"));

var _Database = _interopRequireDefault(require("./server/database/Database"));

var _Tables = _interopRequireDefault(require("./server/database/Tables"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var port = process.env.PORT || 4000;
var db = new _Database["default"]();
db.pool.query(_Tables["default"].createTables, function (err) {
  if (err) _debug["default"].log(err);
});

_index["default"].listen(port, function () {
  return _debug["default"].log('App started!');
});
//# sourceMappingURL=app.js.map