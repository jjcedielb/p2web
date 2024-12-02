"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessLogicException = exports.BusinessError = void 0;
var BusinessError;
(function (BusinessError) {
    BusinessError[BusinessError["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    BusinessError[BusinessError["NOT_FOUND"] = 404] = "NOT_FOUND";
    BusinessError[BusinessError["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    BusinessError[BusinessError["BAD_REQUEST"] = 501] = "BAD_REQUEST";
})(BusinessError || (exports.BusinessError = BusinessError = {}));
class BusinessLogicException extends Error {
    constructor(message, type) {
        super(message);
        this.message = message;
        this.type = type;
    }
}
exports.BusinessLogicException = BusinessLogicException;
//# sourceMappingURL=business-errors.js.map