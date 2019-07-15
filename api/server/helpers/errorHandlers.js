/* eslint-disable linebreak-style */
const authNotsent = { status: 401, error: 'No Authorization header sent. Login and send a token.' };
const expiredToken = { status: 401, error: 'Session expired, login' };
const noAccount = { status: 400, error: 'You do not have an account. Sign up now.' };
const invalidEmailPass = { status: 400, error: 'Incorrect email/password' };
const emailDuplicate = { status: 400, error: 'You already have an account with this email. Login.' };
const invalidQueryString = { status: 400, error: 'The query string (with its value) is not valid.' };

export const errorNoHeader = () => authNotsent;

export const errorExpiredToken = () => expiredToken;

export const errorNoAccount = () => noAccount;

export const errorInvalidEmailPass = () => invalidEmailPass;

export const errorEmailDuplicate = () => emailDuplicate;

export const errorInvalidQueryString = () => invalidQueryString;
