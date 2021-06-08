import { ErrorResponse } from '../ErrorResponse';
import { ValidationError } from 'class-validator';

export class RequestValidationError extends ErrorResponse {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request input');
  }

  errorMessage() {
    console.log(this.errors);
    return this.errors.map((error) => ({
      message: Object.values(error.constraints!).toString(),
      field: error.property,
    }));
  }
}
