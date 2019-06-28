"use strict";

require("babel-polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _index = _interopRequireDefault(require("./server/index"));

var _Database = _interopRequireDefault(require("./server/database/Database"));

var _Tables = require("./server/database/Tables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable no-console */

/* eslint-disable import/no-extraneous-dependencies */
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
_dotenv["default"].config();

var port = process.env.PORT || 4000;
var db = new _Database["default"]();
db.pool.query(_Tables.createTables, function (err) {
  if (err) console.log(err); // await db.query(seedUsers);
  // await db.query(seedCars);
});

_index["default"].listen(port, function () {
  return console.log("App listening on port ".concat(port, "!"));
});
//# sourceMappingURL=app.js.map