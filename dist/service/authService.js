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
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password, matric_Number, userName, phoneNumber, department, faculaty, level } = userData;
    const { data, error } = yield database_1.supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                matric_Number,
                displayName: userName,
                phoneNumber,
                department,
                faculaty,
                level
            }
        }
    });
    const signUpError = getError(error);
    if (signUpError)
        return signUpError;
    const User = {
        id: (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id,
        email,
        userName,
        phoneNumber,
        department,
        faculaty,
        level,
        matric_Number
    };
    return User;
});
exports.createUser = createUser;
const LoginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { email, password } = userData;
    const { data, error } = yield database_1.supabase.auth.signInWithPassword({
        email,
        password
    });
    const logInError = getError(error);
    if (logInError)
        return logInError;
    const User = {
        id: (_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.id,
        email,
        userName: getMetadata(data.user, "displayName"),
        phoneNumber: getMetadata(data.user, "phoneNumber"),
        department: getMetadata(data.user, "department"),
        faculaty: getMetadata(data.user, "faculaty"),
        level: getMetadata(data.user, "level"),
        matric_Number: getMetadata(data.user, "matric_Number"),
    };
    return User;
});
exports.LoginUser = LoginUser;
const getError = (error) => {
    console.log(error);
    const err = (0, errorHelper_1.getErrorMessage)(error);
    console.log("server_Issuse: " + err.stack);
    const appError = {
        message: err.message,
        from: err.from,
    };
    if (error)
        return appError;
    return null;
};
const getMetadata = (obj, key) => {
    return obj.user_metadata[key];
};
