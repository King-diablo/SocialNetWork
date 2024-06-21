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
exports.deleteAccount = exports.deletePost = exports.createPost = exports.updateProfile = exports.getPostById = exports.getAllPosts = void 0;
const userService_1 = require("../../service/userService");
const errorHelper_1 = require("../../util/errorHelper");
const handleError = (err, res) => {
    const error = (0, errorHelper_1.getErrorMessage)(err);
    console.log(error);
    res.status(500).json({ errorMessage: error.message, name: error.from, status: "error" });
};
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, userService_1.GetAllPost)();
        res.status(200).json(posts);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.getAllPosts = getAllPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body.id;
        const post = yield (0, userService_1.GetPostById)(id);
        if (!post)
            return res.status(200).json({ message: "no post found with the specified id", post: {} });
        res.status(200).json(post);
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.getPostById = getPostById;
const updateProfile = (req, res) => {
};
exports.updateProfile = updateProfile;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { content, isMedia } = req.body;
    if ("user" in req) {
        const user = req.user;
        let response = null;
        if (isMedia) {
            if (!content)
                return res.status(404).json({ status: "error", messgae: "content is required" });
            response = yield (0, userService_1.createPostContent)({ content, userId: user.id, isMedia, userName: user.userName });
            res.status(201).json(response);
        }
        else { }
        // create media post
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        if (!id)
            return res.status(404).json({ status: "error", message: "invalid id" });
        yield (0, userService_1.DeletePost)(id);
        res.status(200).json({ status: "success", messgae: "post was deleted succesfuly" });
    }
    catch (error) {
        handleError(error, res);
    }
});
exports.deletePost = deletePost;
const deleteAccount = (req, res) => {
};
exports.deleteAccount = deleteAccount;
