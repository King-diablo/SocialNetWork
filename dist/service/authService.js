"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.createUser = void 0;
const database_1 = require("../config/database");
const errorHelper_1 = require("../util/errorHelper");
const createUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield database_1.supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                displayName: "king",
                phoneNumber: "07030646205"
            }
        }
    });
    const err = (0, errorHelper_1.getErrorMessage)(error);
    console.log(err.stack);
    if (error)
        return {
            message: err.message,
            from: err.errorName,
        };
    return data;
});
exports.createUser = createUser;
const LoginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield database_1.supabase.auth.signInWithPassword({
        email,
        password
    });
    const err = (0, errorHelper_1.getErrorMessage)(error);
    console.log(err.stack);
    if (error)
        return {
            message: err.message,
            from: err.errorName,
        };
    return data;
});
exports.LoginUser = LoginUser;
