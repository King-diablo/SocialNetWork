"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const getErrorMessage = (error) => {
    var _a;
    let message = "unknow error has occured";
    let stack = "unknow error stack";
    let from = "unknow-server";
    let newError = { message, stack, from };
    if (!error)
        return newError;
    if (typeof error === "string")
        message = error;
    if (error instanceof Error) {
        message = error.message;
        stack = error.stack;
        from = error.name;
    }
    if (typeof error === "object") {
        message = error.message;
        stack = error === null || error === void 0 ? void 0 : error.stack;
        from = error === null || error === void 0 ? void 0 : error.name;
    }
    if (error instanceof supabase_js_1.AuthError) {
        message = (_a = error.code) !== null && _a !== void 0 ? _a : error.message;
        stack = error.stack;
        from = error.name;
    }
    newError = { message, stack, from };
    return newError;
};
exports.getErrorMessage = getErrorMessage;
