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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMedia = exports.deleteAccount = exports.deletePost = exports.createPost = exports.updateProfile = exports.getPostById = exports.getAllPosts = void 0;
const userService_1 = require("../../service/userService");
const errorHelper_1 = require("../../util/errorHelper");
const promises_1 = __importDefault(require("fs/promises"));
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
        const id = +req.params.id;
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
            response = yield (0, userService_1.CreatePost)({ content, userId: user.id, isMedia, userName: user.userName });
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
const uploadMedia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const user = req.user;
    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const videoMimeTypes = ['video/mp4', 'video/x-matroska', 'video/avi', 'video/webm'];
    const isImage = (mimeType) => imageMimeTypes.includes(mimeType);
    const isVideo = (mimeType) => videoMimeTypes.includes(mimeType);
    const mimeType = (_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype;
    const path = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
    const data = yield promises_1.default.readFile(path);
    let result = null;
    const fileName = `${user === null || user === void 0 ? void 0 : user.userName}_${Date.now()}`;
    if (mimeType) {
        if (isImage(mimeType)) {
            console.log(`${(_c = req.file) === null || _c === void 0 ? void 0 : _c.filename} is an image with MIME type: ${mimeType}`);
            result = yield (0, userService_1.CreateMedia_Image)(data.buffer, fileName, mimeType);
        }
        else if (isVideo(mimeType)) {
            console.log(`${(_d = req.file) === null || _d === void 0 ? void 0 : _d.filename} is a video with MIME type: ${mimeType}`);
            result = yield (0, userService_1.CreateMedia_Video)(data.buffer, fileName, mimeType);
        }
        else {
            console.log(`${(_e = req.file) === null || _e === void 0 ? void 0 : _e.filename} is neither an image nor a video.`);
            result = "Unable to post content";
        }
    }
    // create a new data in Post database and add the mediaUrl to it
    promises_1.default.rm(path);
    res.json({ status: "success", result });
});
exports.uploadMedia = uploadMedia;
