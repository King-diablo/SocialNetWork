"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./util/env");
const authRouter_1 = __importDefault(require("./router/v1/authRouter"));
const body_parser_1 = require("body-parser");
const userRouter_1 = __importDefault(require("./router/v1/userRouter"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, body_parser_1.urlencoded)({ extended: true }));
const baseRoute = "/api/v1";
app.use(`${baseRoute}/auth`, authRouter_1.default);
app.use(`${baseRoute}/user`, userRouter_1.default);
const PORT = env_1.EVN.PORT || 5000;
app.get("/", (req, res) => {
    res.status(200).json("success");
});
app.listen(PORT, () => {
    console.log(`Listeing on port: ${PORT}`);
});
