"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./util/env");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
const PORT = env_1.EVN.PORT || 5000;
app.get("/", (req, res) => {
    res.status(200).json("success");
});
app.listen(PORT, () => {
    console.log(`Listeing on port: ${PORT}`);
});
