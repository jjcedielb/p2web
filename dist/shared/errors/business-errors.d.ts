export declare enum BusinessError {
    PRECONDITION_FAILED = 412,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
    BAD_REQUEST = 501
}
export declare class BusinessLogicException extends Error {
    message: string;
    type: BusinessError;
    constructor(message: string, type: BusinessError);
}
