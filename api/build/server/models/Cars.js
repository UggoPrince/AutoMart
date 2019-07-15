"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Database = _interopRequireDefault(require("../database/Database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var cloudinary = _cloudinary["default"].v2; // cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var db = new _Database["default"]();

var Cars =
/*#__PURE__*/
function () {
  function Cars() {
    _classCallCheck(this, Cars);
  }

  _createClass(Cars, [{
    key: "postAdvert",
    value: function () {
      var _postAdvert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(carData, car_photo) {
        var img, uploadedImg, queryString, result, _result$rows$, id, created_on, state, status, price, title, manufacturer, model, body_type, image_url;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // check if user for this car exist
                img = '';

                if (!car_photo.str) {
                  _context.next = 5;
                  break;
                }

                img = car_photo.image;
                _context.next = 10;
                break;

              case 5:
                if (car_photo.str) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return this.uploadImage(car_photo.image);

              case 8:
                uploadedImg = _context.sent;
                img = uploadedImg.url;

              case 10:
                queryString = "\n      INSERT INTO cars (\n        owner, state, status, price, title, manufacturer, model, body_type, image_url\n        )\n      VALUES (\n        '".concat(carData.owner, "', '").concat(carData.state, "', '").concat(carData.status, "',\n        '").concat(carData.price, "', '").concat(carData.title, "', '").concat(carData.manufacturer, "',\n        '").concat(carData.model, "', '").concat(carData.body_type, "', '").concat(img, "'\n      )\n      RETURNING *;\n    ");
                _context.next = 13;
                return db.query(queryString);

              case 13:
                result = _context.sent;
                _result$rows$ = result.rows[0], id = _result$rows$.id, created_on = _result$rows$.created_on, state = _result$rows$.state, status = _result$rows$.status, price = _result$rows$.price, title = _result$rows$.title, manufacturer = _result$rows$.manufacturer, model = _result$rows$.model, body_type = _result$rows$.body_type, image_url = _result$rows$.image_url;
                result.rows[0] = {
                  id: id,
                  email: carData.email,
                  created_on: created_on,
                  state: state,
                  status: status,
                  price: price,
                  title: title,
                  manufacturer: manufacturer,
                  model: model,
                  body_type: body_type,
                  image_url: image_url
                };
                return _context.abrupt("return", result);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postAdvert(_x, _x2) {
        return _postAdvert.apply(this, arguments);
      }

      return postAdvert;
    }()
  }, {
    key: "uploadImage",
    value: function () {
      var _uploadImage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(car_photo) {
        var filePath, uploadedImg;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                filePath = car_photo.img_url.path;
                _context2.next = 3;
                return cloudinary.uploader.upload(filePath, {
                  folder: process.env.CLOUDINARY_AUTOMART_FOLDER,
                  use_filename: true
                }, function (err, result) {
                  return result;
                });

              case 3:
                uploadedImg = _context2.sent;
                return _context2.abrupt("return", uploadedImg);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function uploadImage(_x3) {
        return _uploadImage.apply(this, arguments);
      }

      return uploadImage;
    }()
  }, {
    key: "getCarById",
    value: function () {
      var _getCarById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryString = "SELECT * FROM cars WHERE id = '".concat(id, "';");
                _context3.next = 3;
                return db.query(queryString);

              case 3:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getCarById(_x4) {
        return _getCarById.apply(this, arguments);
      }

      return getCarById;
    }()
  }, {
    key: "getCarByOwner",
    value: function () {
      var _getCarByOwner = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(owner) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                queryString = "SELECT * FROM cars WHERE owner = ".concat(owner, ";");
                _context4.next = 3;
                return db.query(queryString);

              case 3:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getCarByOwner(_x5) {
        return _getCarByOwner.apply(this, arguments);
      }

      return getCarByOwner;
    }()
    /* async getACar(id) {
      const result = await this.getCarById(id);
      return result;
    } */

  }, {
    key: "getAllCars",
    value: function () {
      var _getAllCars = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                queryString = 'SELECT * FROM cars;';
                _context5.next = 3;
                return db.query(queryString);

              case 3:
                result = _context5.sent;
                return _context5.abrupt("return", result);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getAllCars() {
        return _getAllCars.apply(this, arguments);
      }

      return getAllCars;
    }()
  }, {
    key: "getCarsByStatusAvailable",
    value: function () {
      var _getCarsByStatusAvailable = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                queryString = 'SELECT * FROM cars WHERE status = \'available\';';
                result = db.query(queryString);
                return _context6.abrupt("return", result);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getCarsByStatusAvailable() {
        return _getCarsByStatusAvailable.apply(this, arguments);
      }

      return getCarsByStatusAvailable;
    }()
  }, {
    key: "getCarsByStatusAndPriceRange",
    value: function () {
      var _getCarsByStatusAndPriceRange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(min, max) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                queryString = "SELECT * FROM cars WHERE status = 'available'\n      AND price BETWEEN ".concat(min, " AND ").concat(max, ";");
                result = db.query(queryString);
                return _context7.abrupt("return", result);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getCarsByStatusAndPriceRange(_x6, _x7) {
        return _getCarsByStatusAndPriceRange.apply(this, arguments);
      }

      return getCarsByStatusAndPriceRange;
    }()
  }, {
    key: "getCarsByStatusAndState",
    value: function () {
      var _getCarsByStatusAndState = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(field, state) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                queryString = "SELECT * FROM cars WHERE status = 'available'\n      AND ".concat(field, " = '").concat(state, "';");
                result = db.query(queryString);
                return _context8.abrupt("return", result);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getCarsByStatusAndState(_x8, _x9) {
        return _getCarsByStatusAndState.apply(this, arguments);
      }

      return getCarsByStatusAndState;
    }()
  }, {
    key: "getCarsByStatusAndManufacturer",
    value: function () {
      var _getCarsByStatusAndManufacturer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(field, manufacturer) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                queryString = "SELECT * FROM cars WHERE status = 'available'\n      AND ".concat(field, " ~* '").concat(manufacturer, "';");
                result = db.query(queryString);
                return _context9.abrupt("return", result);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function getCarsByStatusAndManufacturer(_x10, _x11) {
        return _getCarsByStatusAndManufacturer.apply(this, arguments);
      }

      return getCarsByStatusAndManufacturer;
    }()
  }, {
    key: "updater",
    value: function () {
      var _updater = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee10(car_id, field, value, ownerEmail) {
        var queryString, result, _result$rows$2, id, created_on, state, status, price, title, manufacturer, model, body_type, image_url;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                queryString = "UPDATE cars SET ".concat(field, " = '").concat(value, "'\n    WHERE id = '").concat(car_id, "' RETURNING *;");
                _context10.next = 3;
                return db.query(queryString);

              case 3:
                result = _context10.sent;
                _result$rows$2 = result.rows[0], id = _result$rows$2.id, created_on = _result$rows$2.created_on, state = _result$rows$2.state, status = _result$rows$2.status, price = _result$rows$2.price, title = _result$rows$2.title, manufacturer = _result$rows$2.manufacturer, model = _result$rows$2.model, body_type = _result$rows$2.body_type, image_url = _result$rows$2.image_url;
                result.rows[0] = {
                  id: id,
                  email: ownerEmail,
                  created_on: created_on,
                  state: state,
                  status: status,
                  price: price,
                  title: title,
                  manufacturer: manufacturer,
                  model: model,
                  body_type: body_type,
                  image_url: image_url
                };
                return _context10.abrupt("return", result);

              case 7:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function updater(_x12, _x13, _x14, _x15) {
        return _updater.apply(this, arguments);
      }

      return updater;
    }()
  }, {
    key: "updateStatus",
    value: function () {
      var _updateStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee11(carData) {
        var result;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.updater(carData.car_id, 'status', 'sold', carData.email);

              case 2:
                result = _context11.sent;
                return _context11.abrupt("return", result);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function updateStatus(_x16) {
        return _updateStatus.apply(this, arguments);
      }

      return updateStatus;
    }()
  }, {
    key: "updatePrice",
    value: function () {
      var _updatePrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee12(carData) {
        var result;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.updater(carData.car_id, 'price', carData.price, carData.email);

              case 2:
                result = _context12.sent;
                return _context12.abrupt("return", result);

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function updatePrice(_x17) {
        return _updatePrice.apply(this, arguments);
      }

      return updatePrice;
    }()
  }, {
    key: "deleteAdvert",
    value: function () {
      var _deleteAdvert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee13(car_id) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                queryString = "DELETE FROM cars WHERE id ='".concat(car_id, "';");
                _context13.next = 3;
                return db.query(queryString);

              case 3:
                result = _context13.sent;
                return _context13.abrupt("return", result);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function deleteAdvert(_x18) {
        return _deleteAdvert.apply(this, arguments);
      }

      return deleteAdvert;
    }()
  }]);

  return Cars;
}();

var _default = new Cars();

exports["default"] = _default;
//# sourceMappingURL=Cars.js.map