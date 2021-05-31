export abstract class ErrorResponse extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
  }

  abstract errorMessage(): { message: string; field?: string }[];
}
