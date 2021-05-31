import { ErrorResponse } from '../ErrorResponse';

export class RequestError extends ErrorResponse {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
  }

  errorMessage() {
    return [{ message: this.message }];
  }
}
