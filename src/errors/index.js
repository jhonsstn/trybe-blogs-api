const BadRequestError = require('./bad-request-error');
const ConflictError = require('./conflict-error');
const UnauthorizedError = require('./unauthorized-error');
const NotFoundError = require('./not-found-error');

module.exports = {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  NotFoundError,
};