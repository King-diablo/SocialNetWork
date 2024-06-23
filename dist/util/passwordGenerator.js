"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPassword = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("./env");
const encryptPassword = (password) => {
    return bcrypt_1.default.hash(password, +env_1.EVN.SALT_ROUNDS);
};
exports.encryptPassword = encryptPassword;
const decryptPassword = (hash, password) => {
    return bcrypt_1.default.compare(password, hash);
};
exports.decryptPassword = decryptPassword;
