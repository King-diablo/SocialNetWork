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
const globals_1 = require("@jest/globals");
const encryptHelper_1 = require("../util/encryptHelper");
const password = "kingdiablo";
(0, globals_1.test)("hash_password_success", () => __awaiter(void 0, void 0, void 0, function* () {
    (0, globals_1.expect)(yield (0, encryptHelper_1.Hash)(password)).toBeInstanceOf(String);
}), 5000);
