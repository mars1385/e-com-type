import { ErrorResponse } from '../ErrorResponse';

export class AuthorizationError extends ErrorResponse {
  statusCode = 401;

  constructor() {
    super('Not authorized to access this route');
  }

  errorMessage() {
    return [{ message: 'Not authorized to access this route' }];
  }
}
