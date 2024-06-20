"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controller/v1/userController");
const router = express_1.default.Router();
router.post("/update", userController_1.updateProfile)
    .post("/createPost", userController_1.createPost)
    .post("/startPost/:id", userController_1.starPost);
router.delete("/delete", userController_1.deleteAccount)
    .delete("/post/:id", userController_1.deletePost);
exports.default = router;
