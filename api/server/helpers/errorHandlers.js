/* eslint-disable linebreak-style */
const authNotsent = { status: 401, error: 'No authentication header sent. Login and send a token.' };
const expiredToken = { status: 401, error: 'Session expired, login' };
const noAccount = { status: 400, error: 'You do not have an account. Sign up now.' };
const invalidEmailPass = { status: 400, error: 'Incorrect email/password' };
const emailDuplicate = { status: 400, error: 'You already have an account with this email. Login.' };

export const errorNoHeader = () => authNotsent;

export const errorExpiredToken = () => expiredToken;

export const errorNoAccount = () => noAccount;

export const errorInvalidEmailPass = () => invalidEmailPass;

export const errorEmailDuplicate = () => emailDuplicate;
