"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorEmailDuplicate = exports.errorInvalidEmailPass = exports.errorNoAccount = exports.errorExpiredToken = exports.errorNoHeader = void 0;

/* eslint-disable linebreak-style */
var authNotsent = {
  status: 401,
  error: 'No authentication header sent. Login and send a token.'
};
var expiredToken = {
  status: 401,
  error: 'Session expired, login'
};
var noAccount = {
  status: 400,
  error: 'You do not have an account. Sign up now.'
};
var invalidEmailPass = {
  status: 400,
  error: 'Incorrect email/password'
};
var emailDuplicate = {
  status: 400,
  error: 'You already have an account with this email. Login.'
};

var errorNoHeader = function errorNoHeader() {
  return authNotsent;
};

exports.errorNoHeader = errorNoHeader;

var errorExpiredToken = function errorExpiredToken() {
  return expiredToken;
};

exports.errorExpiredToken = errorExpiredToken;

var errorNoAccount = function errorNoAccount() {
  return noAccount;
};

exports.errorNoAccount = errorNoAccount;

var errorInvalidEmailPass = function errorInvalidEmailPass() {
  return invalidEmailPass;
};

exports.errorInvalidEmailPass = errorInvalidEmailPass;

var errorEmailDuplicate = function errorEmailDuplicate() {
  return emailDuplicate;
};

exports.errorEmailDuplicate = errorEmailDuplicate;
//# sourceMappingURL=errorHandlers.js.map