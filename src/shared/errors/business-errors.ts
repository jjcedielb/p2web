export enum BusinessError {
  PRECONDITION_FAILED = 412,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  BAD_REQUEST,
}

export class BusinessLogicException extends Error {
  constructor(public message: string, public type: BusinessError) {
    super(message);
  }
}