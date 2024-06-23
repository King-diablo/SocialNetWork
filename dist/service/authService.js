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
const passwordGenerator_1 = require("../util/passwordGenerator");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, password, matricNumber, userName, phoneNumber, department, faculaty, level } = userData;
    const response = yield (0, exports.LoginUser)({ email, password });
    let customError = null;
    if ("email" in response) {
        customError = getError("user already exist");
    }
    const hashedPassword = yield (0, passwordGenerator_1.encryptPassword)(password);
    let creatingUserData = null;
    let creatingUserError = null;
    if (!customError) {
        const { data, error } = yield database_1.supabase
            .from("Users")
            .insert({ email, password: hashedPassword, userName, phoneNumber, department, faculaty, level, matricNumber })
            .select()
            .limit(1)
            .single();
        creatingUserData = data;
        creatingUserError = error;
    }
    const signUpError = (_a = getError(creatingUserError)) !== null && _a !== void 0 ? _a : customError;
    if (signUpError)
        return signUpError;
    const id = creatingUserData.id;
    const role = creatingUserData.role;
    const User = {
        id: id,
        email,
        userName,
        phoneNumber,
        department,
        faculaty,
        level,
        matricNumber,
        role,
    };
    return User;
});
exports.createUser = createUser;
const LoginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { email, password } = userData;
    const { data, error } = yield database_1.supabase
        .from("Users")
        .select()
        .eq("email", email)
        .limit(1)
        .single();
    let isUser = null;
    if (data)
        isUser = yield (0, passwordGenerator_1.decryptPassword)(data.password, password);
    const logInError = (_b = getError(error)) !== null && _b !== void 0 ? _b : getError(isUser ? null : "password is incorrect");
    if (logInError)
        return logInError;
    const User = {
        id: data.id,
        email,
        userName: data.userName,
        phoneNumber: data.phoneNumber,
        department: data.department,
        faculaty: data.faculaty,
        level: data.level,
        matricNumber: data.matricNumber,
        role: data.role
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
