import { ErrorResponse } from '../ErrorResponse';

export class NotFoundError extends ErrorResponse {
  statusCode = 404;

  constructor(public message: string) {
    super(message);
  }

  errorMessage() {
    return [{ message: this.message }];
  }
}
