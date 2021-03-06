export class BadRequestError {
  name = 'BadRequestError';
  message: string;
  stack?: string;

  constructor(message?: SerializableError) {
    const error = new Error(message && message.errorName);
    this.stack = error.stack;
    this.message = error.message;
  }
}

export class UnauthorizedError {
  name = 'UnauthorizedError';
  message: string;
  stack?: string;

  constructor(message?: SerializableError) {
    const error = new Error(message && message.errorName);
    this.stack = error.stack;
    this.message = error.message;
  }
}

export class ForbiddenError {
  name = 'ForbiddenError';
  message: string;
  parameters: any;
  stack?: string;

  constructor(message?: SerializableError) {
    const error = new Error(message && message.errorName);
    this.stack = error.stack;
    this.parameters = (message && message.parameters) || {};
    this.message = error.message;
  }
}

export class NotFoundError {
  name = 'NotFoundError';
  message: string;
  stack?: string;

  constructor(message?: SerializableError) {
    const error = new Error(message && message.errorName);
    this.stack = error.stack;
    this.message = error.message;
  }
}

export class RemoteError {
  name = 'RemoteError';
  message: string;
  stack?: string;

  constructor(message?: SerializableError) {
    const error = new Error(message && message.errorName);
    this.stack = error.stack;
    this.message = error.message;
  }
}

export interface SerializableError {
  errorName: string;
  parameters?: object;
}
