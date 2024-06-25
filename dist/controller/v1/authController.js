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
exports.validateUser = exports.login = exports.signUp = void 0;
const authService_1 = require("../../service/authService");
const token_1 = require("../../util/token");
const errorHelper_1 = require("../../util/errorHelper");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // recive a token that has the remeaning data for the user
    const userData = req.body;
    try {
        const response = yield (0, authService_1.createUser)(userData);
        if ("id" in response) {
            const token = yield (0, token_1.Encrypt)(response);
            return res.status(200).json({ status: "success", message: "created account successfuly", response, token });
        }
        else {
            return res.status(400).json({ status: "error", response });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "an error has occured" });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    try {
        const response = yield (0, authService_1.LoginUser)(userData);
        if ("email" in response) {
            const token = yield (0, token_1.Encrypt)(response);
            return res.status(200).json({ status: "success", message: "logged in succesfuly", response, token });
        }
        else {
            return res.status(400).json({ status: "error", response });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "an error has occured" });
    }
});
exports.login = login;
const validateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matricNumber, password } = req.body;
    try {
        const payload = {};
        const response = yield fetch("", payload);
        res.json(response);
        //create a token and send it to the user
    }
    catch (err) {
        const error = (0, errorHelper_1.getErrorMessage)(err);
        console.log(error.stack);
        res.status(500).json(error);
    }
});
exports.validateUser = validateUser;
