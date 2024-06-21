"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controller/v1/userController");
const tokenHandler_1 = require("../../middleware/tokenHandler");
const router = express_1.default.Router();
router.get("/post", userController_1.getAllPosts);
router.get("/post/:id", tokenHandler_1.DecryptToken, userController_1.getPostById);
router.post("/update", tokenHandler_1.DecryptToken, userController_1.updateProfile);
router.post("/post", tokenHandler_1.DecryptToken, userController_1.createPost);
router.delete("/post/:id", tokenHandler_1.DecryptToken, userController_1.deletePost);
router.delete("/account/:id", tokenHandler_1.DecryptToken, userController_1.deleteAccount);
exports.default = router;
