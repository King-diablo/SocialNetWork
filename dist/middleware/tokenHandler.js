"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecryptValidationToken = exports.DecryptToken = void 0;
const token_1 = require("../util/token");
const errorHelper_1 = require("../util/errorHelper");
const DecryptToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader)
        return res.status(403).json({ message: 'token required', status: 'error' });
    try {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        const data = (0, token_1.Decrypt)(token);
        if (typeof (data) === "object" && "id" in data) {
            req.user = data;
            return next();
        }
        else {
            res.status(400).json({ status: "error", message: "an error occured while decoding token" });
        }
    }
    catch (err) {
        const error = (0, errorHelper_1.getErrorMessage)(err);
        console.error(error);
        res.status(500).json({ error: error.message, status: "error" });
    }
};
exports.DecryptToken = DecryptToken;
const DecryptValidationToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader)
        return res.status(403).json({ message: 'token required', status: 'error' });
    try {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        const data = (0, token_1.Decrypt)(token);
        if (typeof (data) === "object" && "id" in data) {
            req.user = data;
            return next();
        }
        else {
            res.status(400).json({ status: "error", message: "an error occured while decoding token" });
        }
    }
    catch (err) {
        const error = (0, errorHelper_1.getErrorMessage)(err);
        console.error(error);
        res.status(500).json({ error: error.message, status: "error" });
    }
};
exports.DecryptValidationToken = DecryptValidationToken;
