"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("./env");
const createToken = (data) => {
    const s_key = env_1.EVN.SECRET;
    let payload = null;
    if (s_key)
        payload = jsonwebtoken_1.default.sign(data, s_key, { expiresIn: "24h" });
    if (payload)
        return payload;
};
exports.createToken = createToken;
const decodeToken = (token) => {
    const s_key = env_1.EVN.SECRET;
    let payload = null;
    if (s_key)
        payload = jsonwebtoken_1.default.verify(token, s_key);
    if (payload) {
        return payload;
    }
};
exports.decodeToken = decodeToken;
